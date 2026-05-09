const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  moduleNameMapper: {
    '^(\\.*)\\.js$': '$1',
  },
  transformIgnorePatterns: [
    "node_modules/(?!(uuid|dotenv)/)"
  ],
  moduleDirectories: ['node_modules', 'src'],
  testPathIgnorePatterns: ["/node_modules/"]
};
