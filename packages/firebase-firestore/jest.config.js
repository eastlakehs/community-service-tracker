// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

export default {
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.[j]s?(x)", "**/?(*.)+(spec|test).[j]s?(x)"],
  // disable any jest code transforms
  transform: {},
  moduleNameMapper: {
    "^firebase-admin/app$":
      "<rootDir>/node_modules/firebase-admin/lib/app/index.js",
    "^firebase-admin/auth$":
      "<rootDir>/node_modules/firebase-admin/lib/auth/index.js",
  },
};
