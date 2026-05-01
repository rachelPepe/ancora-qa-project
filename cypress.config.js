const { defineConfig } = require("cypress");
const fs = require("fs");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://jsonplaceholder.typicode.com",
    watchForFileChanges: false,
    specPattern: "cypress/e2e/**/*.spec.js",
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: true,
      json: true,
    },

    env: {
      allowCypressEnv: false,
    },

    
    setupNodeEvents(on, config) {
      on("task", {
        setEnv({ key, value }) {
          const envPath = "cypress.env.json";
          const currentEnv = fs.existsSync(envPath)
            ? JSON.parse(fs.readFileSync(envPath, "utf8"))
            : {};

          currentEnv[key] = value;
          fs.writeFileSync(envPath, JSON.stringify(currentEnv, null, 2));

          return null;
        },
      });
    },
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
