# KLM

## Requirements

- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Terminals Manager](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-terminals) extension for VSCode
- [NPM](https://www.npmjs.com/)

## Setup

### Clone the repository

```bash
git clone https://github.com/Furiza31/klm.git
```

### Install dependencies

```bash
cd ./app
npm install
```

```bash
cd ./api
npm install
```

### Do database migrations

```bash
cd ./api
npm run prisma:setup
```

### Env variables

You can find the env variables for app and api in the `README.md` of each folder.

### Run the app

Install the [Terminals Manager](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-terminals) extension in VSCode.

After that, press `Ctrl + Shift + P` and type `>Terminals: Run`.

That's it!
