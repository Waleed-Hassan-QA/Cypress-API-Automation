const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  
  e2e: {
    baseUrl: 'https://gorest.co.in/public/v2/users/',
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
        require('cypress-mochawesome-reporter/plugin')(on);
      // implement node event listeners here
    },
  },
   env: {

      token: 'Bearer eb906c43a292135c4a1cd99ec58b54af482fb068720f95e7e5ee3e64292e0610'
      
    }

});
