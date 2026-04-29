const { defineConfig } = require("cypress");
const fs = require("fs");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.spec.js",
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: true,
      json: true,
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
});
