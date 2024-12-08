
const path = require('path');

const fs = require('node:fs/promises');
const cucumberJson = require('wdio-cucumberjs-json-reporter');

const allureReporter = require('@wdio/allure-reporter').default

exports.config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    // WebdriverIO supports running e2e tests as well as unit and component tests.
    runner: 'local',

    specs: [
        path.join(process.cwd(), './src/features/*.feature')

    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
   
    maxInstances: 2, //10,
    capabilities: [
    
    {
      platformName: 'Android',
     //'appium:deviceName': 'HYF4C18918013372', //'RZCX52JE1QP',
      'port': 4723,
      //'appium:platformVersion': '12.0',
      'appium:automationName': 'UiAutomator2',
     // "appium:platformVersion": "9.0",
      "appium:app": path.join(process.cwd(), "./app/android/Android-MyDemoAppRN.1.3.0.build-244.apk"),
      "appium:autoGrantPermissions": true
    },
    {
      // capabilities for local Appium web tests on an Android Emulator
      platformName: 'Android',
      //'appium:deviceName': 'RZCX52JE1QP', //'RZCX52JE1QP',
      'port': 4725,
      //'appium:platformVersion': '12.0',
      'appium:automationName': 'UiAutomator2',
     // "appium:platformVersion": "9.0",
      "appium:app": path.join(process.cwd(), "./app/android/Android-MyDemoAppRN.1.3.0.build-244.apk"),
      "appium:autoGrantPermissions": true
    }
],

    logLevel: 'info',
    bail: 0,
    waitforTimeout: 30000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [
        ['appium', {
          args: {
            address: '127.0.0.1',
            port: 4723,
            relaxedSecurity: true,
            defaultCapabilities: {'appium:udid': 'HYF4C18918013372','appium:command-timeout': '10000'} 
          },
          logPath: './',
          log: './wdio-appium1.log'
        }],
        ['appium', {
          args: {
            address: '127.0.0.1',
            port: 4725,
            relaxedSecurity: true,
            defaultCapabilities: {'appium:udid': 'RZCX52JE1QP','appium:command-timeout': '10000'}  
          },
          logPath: './',
           log: './wdio-appium2.log'
        }]
    ],
    


    framework: 'cucumber',
    
    //
    // The number of times to retry the entire specfile when it fails as a whole
    // specFileRetries: 1,
    //
    // Delay in seconds between the spec file retry attempts
    // specFileRetriesDelay: 0,
    //
    // Whether or not retried spec files should be retried immediately or deferred to the end of the queue
    // specFileRetriesDeferred: false,
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter
    
    reporters: ['spec',['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting:true,
        disableWebdriverScreenshotsReporting:false,
        useCucumberStepReporter:true,
        addConsoleLogs:false,
    }]],
    
    /*reporters: ['spec',
            ['cucumberjs-json', {
                jsonFolder: 'tmp/json/',
                language: 'en',
            },
        ]],*/
        
    // If you are using Cucumber you need to specify the location of your step definitions.
    cucumberOpts: {
        // <string[]> (file/dir) require files before executing features
        require: [
                    path.join(process.cwd(), './src/steps/*.js')
],
        // <boolean> show full backtrace for errors
        backtrace: false,
        // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        requireModule: [],
        // <boolean> invoke formatters without executing steps
        dryRun: false,
        // <boolean> abort the run on first failure
        failFast: false,
        // <string[]> Only execute the scenarios with name matching the expression (repeatable).
        name: [],
        // <boolean> hide step definition snippets for pending steps
        snippets: true,
        // <boolean> hide source uris
        source: true,
        // <boolean> fail if there are any undefined or pending steps
        strict: false,
        // <string> (expression) only execute the features or scenarios with tags matching the expression
        tagExpression: '',
        // <number> timeout for step definitions
        timeout: 60000,
        // <boolean> Enable this config to treat undefined definitions as warnings.
        ignoreUndefinedDefinitions: false
    },

     onPrepare: () => {
         // Remove the `tmp/` folder that holds the json and report files
         return fs.rm('tmp/', { recursive: true });
     },
  
    onComplete: async () => {
    // Generate the report when it all tests are done
      
      /*const htmlReporter = require('multiple-cucumber-html-reporter');
      
      await htmlReporter.generate({
        theme: 'bootstrap',
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        pageTitle: `Testes CGA`,
        reportName: `report dos testes`,
        disableLog: true,
        jsonDir: './tmp/json',
        reportPath: './reports',
        displayDuration: true,
        //durationInMS: true,
        displayReportTime: true,
        linkScreenshots: true,
        failedSummaryReport: true
      });*/
      
  },
 

  afterStep: async function(step) {
    console.log('End Step: ' +  step.text);

    // Attach a screenshot in a before hook 
    await browser.takeScreenshot();
    
    //cucumberJson.attach(await browser.takeScreenshot(), 'image/png'); 
      

    //console.log('after takescreenshot');
    //await browser.takeScreenshot();
    
  },

  afterTest: function(test) {
    console.log('End Test: ', test);
  },
  

}
