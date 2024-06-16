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

# Guide to Build & Run MuHASS on Windows for Android devices
1. Navigate to the frontend branch
2. Delete node_modules in every folder
3. Navigate to the root, run `npm install expo`
4. Once expo is installed run `npm run prebuild`
5. If you don't have gradle already installed on your computer navigate to https://gradle.org/install/ and follow the instructions provided for manually installation. Remember to install v8.4. Tp check which version you have run `gradle -v`
6. If you don't have jdk already installed on your computer navigate to https://docs.oracle.com/en/java/javase/22/install/installation-jdk-microsoft-windows-platforms.html and follow the instructions provided. Remember to install JDK 17 if you have a newer version you may need to uninstall it for the application to work, the link provides instructions to do so
7. Once you have verified navigate to the project's root directory and run
`npm run android`
8. In a separate terminal run `npm run server` to run the backend server

## Debugging Error Messages
### Error 1:
`FAILURE: Build failed with an exception. What went wrong: Could not determine the dependencies of task ':app:compileDebugJavaWithJavac'. Could not determine the dependencies of null. SDK location not found. Define a valid SDK location with an ANDROID_HOME environment variable or by setting the sdk.dir path in your project's local properties file at <FILE_LOCATION>`

### Follow the instructions to fix Error 1:
1. Check if you have the following file in this path:
`C:\Users\<UserName>\Documents\GitHub\MuHASS\frontend\android\local.properties`
2. If you do not have this file, create the local.properties file inside the directory `C:\Users\<UserName>\Documents\GitHub\MuHASS\frontend\android\` you can use the command `notepad local.properties`
3. Add the following line to the file:
`sdk.dir=C:\\Users\\<UserName>\\AppData\\Local\\Android\\Sdk` This is the location of your android sdk. 
4. Rerun the command `npm run android` in the root directory



