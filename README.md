# Introduction

This is a monorepo managed with [NPM workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces) containing the following components:

- frontend (Mobile app)
- the backend (API endpoint)
- the bluetooth server

# Install Expo Go on your mobile device.

# Install dependencies

`npm install` or `npm i`
`pip install -r requirements.txt`

# Adding dependencies

# Running the monorepo

The project requires every component to run on the terminal for development.

`npm run expo` - Just Expo

`npm run dev` - Concurrently runs all components of the monorepo (Note: This doesn't seem to display QR code for Expo)

`npm run ble` - Running just the bluetooth server

`npm run server` Just the API server

# Change IP Address

Enter frontend->src->components->data->LocalHost.json
In command line, run `ipconfig`, and copy the ipv4 address
Change the ipAddress parameter in the JSON file to the one on your computer

# Scan QR code after running the app.
