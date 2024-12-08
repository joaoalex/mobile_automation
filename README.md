# Mobile App Test Automation

This project automates the testing of the login functionality of a mobile application using Appium, WebdriverIO, and Cucumber BDD, following the Page Object Model design pattern.

## Prerequisites

- Node.js
- Android studio - SDK setup, emulator setup
- Set environment variables for Java, SDK
- Appium 

## Installation

1. Install dependencies using `npm install`
2. Set up the Android emulator or connect a real device.

## Running the Tests

1. Place the apk file in the app/android folder
2. Set capabilities in wdio.conf.js
3. Run the tests: npm run android

## Generating Reports with multiple cucumber-http-report add-on
cd reports
#serving static files with http-server  
http-server 


## Project Structure

- **features/**: Contains feature files for Cucumber BDD.
- **src/page_objects/**: Contains page object classes.
- **src/steps/**: Contains step definitions.
- **reports/**: Contains static website to serve reports
- **tmp/**: Contains json files of results
- **wdio.conf.js**: WebdriverIO configuration file.
- **package.json**: contains dependencies with versions.


