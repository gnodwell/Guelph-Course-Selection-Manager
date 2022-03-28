
module.exports = {
    setupFilesAfterEnv: [
      "<rootDir>/src/setupTests.js"
    ],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|svg)$": "./src/config/fileMock.js",
        "\\.(css|scss)$": "identity-obj-proxy"
    }
}

