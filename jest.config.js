module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePaths: ['<rootDir>'],
  moduleNameMapper: {
    "@application(.*)$": ["src/composer/application$1"],
    "@model(.*)$": ["src/composer/domain/model$1"],
    "@components(.*)$": ["src/composer/view/components$1"],
    "@view(.*)$": ["src/composer/view$1"],
    "@main(.*)$": ["src/composer$1"],
  }
};