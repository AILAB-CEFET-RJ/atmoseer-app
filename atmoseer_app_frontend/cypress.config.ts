import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    browserPermissions: {
      notifications: "allow",
      geolocation: "allow",
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
