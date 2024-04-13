# Introduction

This is a monorepo managed with [NPM workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces) containing the following components:

- React Native app (Expo/Javascript)
- Database/API backend (Typescript)
- Bluetooth server (Python)

As NPM only manages JavaScript libraries, NPM Workspaces **only handles** running scripts for the Bluetooth server, **not** its packages. Python packages are managed by `pip`.

# Installing dependencies
1. Install the LTS version of Node.js: https://nodejs.org/en/download/current 
2. `npm install` or `npm i`
3. Install the latest version of Python: https://www.python.org/downloads/
4. `pip install -r requirements.txt`

# Adding dependencies

If the dependency is universal, you can use the usual `npm install <PACKAGE NAME>` - but if the package is specific to a workspace, it must be indicated explicitly.

## Javascript packages
`npm i <PACKAGE NAME> -w <WORKSPACE NAME>`
- Example installation of axios to workspace "frontend": `npm i axios -w frontend`

## Python packages
`pip install <PACKAGE NAME>`
- Python packages are not managed through NPM Workspace; no special package installation command is required.

# Running the project for the first time
1. Install all dependencies - `npm install`
2. Generate prisma files - `npm run generate`
3. Create a `.env` file at the root of the project and add all secrets necessary. This should be available somewhere private and secure to the team.

# Setting IP Address for Bluetooth connection

1. Navigate to `frontend>src>components>data>LocalHost.json`
2. In the command line, run `ipconfig`, and copy the ipv4 address
3. Change the ipAddress parameter in the JSON file to the one on your computer

# Running the project
The project requires every component to run on one or multiple terminals for development.
  - `npm run prebuild` - 
  - `npm run expo` - Just the React Native/Expo/frontend of our project
  - `npm run server` - Just the backend server


