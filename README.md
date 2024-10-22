# Git Conventional Commits CLI

Generate conventional commit messages from the command line. 

I liked using [conventional commits extension](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits) on [VS Code](https://code.visualstudio.com/) and wanted to have a similar experience on the terminal.

This CLI is inspired by the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

## Installation

Make sure you have node.js installed on your system. You can download it from [here](https://nodejs.org/).

Run the following command to install the CLI globally.

```npm i c-commit-cli -g```

You can now run `commit` from any directory.

## Usage

Make sure to stage your changes before running the command.   
The goal of the CLI is to help you generate conventional commit messages and not manage your git workflow.

Run `commit` to initiate the commit process.


### What type of commit are you making?

The first prompt is about the type of commit you are making. Following are the options you can pick from.

![Select commit type](./imgs/demo-type.gif)

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semicolons, etc.)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

#### To be added in the future

- **wip**: Work in progress
- **release**: Release a new version
- **deps**: Update dependencies
- **security**: Fix security issues
- **breaking**: Introduce breaking changes

### Select if it a breaking change commits

<!-- TODO: It would be better to owner of project to record and insert gifs -->
- **y**: For breaking changes. It will add "!" at the end of commit's prefix
- **N**: For regular commits

### Add commit context

<!-- TODO: It would be better to owner of project to record and insert gifs -->
You will be prompted to enter a context of commit in braces. For example: `feat(auth)`

### Select a Gitmoji

The fourth prompt is about selecting a Gitmoji. Gitmoji is an emoji guide for your commit messages. You can find more about it [here](https://gitmoji.dev/).

![Select Gitmoji](./imgs/demo-emoji.gif)

> If you don't want "Type" or "Gitmoji", you can skip them.

### Commit message and details

You will be prompted to enter a commit message and an optional detailed description of the changes you made.

![Commit message and details](./imgs/demo-message.gif)

If you want to add a detailed description, you will be taken to your default editor to write the description. The changes made and saved in the editor will reflect in the terminal once you close the editor.

### Commit message preview

On the final stage you will get a preview of the commit message. You can either confirm the message or go back to make changes.

![Commit message preview](./imgs/demo-final.gif)

## Feedback

Feel free to open an issue if you have any feedback or suggestions. I would love to hear from you.

If you want to contribute, please open a pull request. 
