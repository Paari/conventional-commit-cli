#! /usr/bin/env node
import { spawn } from 'child_process';
import inquirer from 'inquirer';
import inquirerPrompt from 'inquirer-search-list';
import { messageType, commitBreakingChanges, commitPrefixContext, messageGitmoji, commitMessage, commitDescription } from './src/messagePrompt.js';

inquirer.registerPrompt('search-list', inquirerPrompt);

// Ask user from a list of options
// ask for type of commit
let messageTypeValue = await messageType();
console.log(messageTypeValue);

// ask for "!" to provide BREAKING CHANGE
let commitBreakingChangesValue = await commitBreakingChanges();
console.log(commitBreakingChangesValue)

// ask for prefix context
let commitPrefixContextValue = await commitPrefixContext();
console.log(commitPrefixContextValue)

// ask for gitmoji
let messageGitmojiValue = await messageGitmoji();
console.log(messageGitmojiValue);

// ask for commit message
let commitMessageValue = await commitMessage();
commitMessageValue = commitMessageValue.trim();

let commitDescriptionValue = '';
// ask if the user wants to add a description
const addDescription = await inquirer
    .prompt([
        {
            type: 'confirm',
            name: 'commitDescription',
            message: 'Do you want to add a description?',
            default: false,
        },
    ]);

if (addDescription.commitDescription) {
    commitDescriptionValue = await commitDescription();
}

// compose the commit message
let finalMessage = 
`${messageTypeValue.length != 0 ? messageTypeValue : ''}${commitPrefixContextValue.length != 0 ? `(${commitPrefixContextValue})` : ''}${commitBreakingChangesValue ? '!' : ''}${(messageTypeValue + commitPrefixContextValue).length != 0 ? ':' : ''} ${messageGitmojiValue} ${commitMessageValue}

${commitDescriptionValue}`;

await finalConfirmation();

// show to prompt to confirm the commit message
async function finalConfirmation() {
    finalMessage = finalMessage.trim();

    const confirmCommit = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirm',
            message: `
------\n${finalMessage}\n------
Are you sure you want to commit with the above message?
'y' to confirm, 'n' to edit/abort.
`,
        },
    ]);

    if (confirmCommit.confirm) { 
        commit();
    } else {
        // ask if the user wants to edit or abort
        const editOrAbort = await inquirer.prompt([
            {
                type: 'list',
                name: 'editOrAbort',
                message: 'What do you want to do?',
                choices: ['Edit', 'Abort'],
            },
        ]);

        if (editOrAbort.editOrAbort === 'Edit') {
            // edit finalMessage in editor using inquirer
            const editMessage = await inquirer.prompt([
                {
                    type: 'editor',
                    name: 'message',
                    message: 'Edit the commit message',
                    default: finalMessage,
                },
            ]);

            // commit with the edited message
            finalMessage = editMessage.message;
            await finalConfirmation();
            commit();
        } else {
            console.log('Commit aborted');
        }
    }
}

function commit() {
    const gitCommit = spawn('git', ['commit', '-m', finalMessage]);
    gitCommit.stdout.on('data', (data) => {
        console.log(`${data}`);
    });
    gitCommit.stderr.on('data', (data) => {
        console.log(`${data}`);
    });

    gitCommit.on('close', (code) => {
        if (code !== 0) {
            console.log(`git commit failed with code ${code}`);
            return;
        }
        console.log('Commit successful');
    });
}
