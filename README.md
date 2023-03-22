# Sample repo for test issues

# Expo

This mobile app is scaffolded with [Expo](https://docs.expo.io/).

## Requirements

- Expo [requires](https://docs.expo.io/get-started/installation/#requirements)
  Node LTS version or greater. Using [NVM](https://github.com/nvm-sh/nvm), we
  can ensure everyone is using the same versions, based in the `.nvmrc`.
  - run `nvm use` when you enter this repo.
    - Or, [Install a helper command](https://stackoverflow.com/a/39519460) in
      your `.zshrc` (or equivalent bash settings) to enable automatic updates
      when you switch folders.

## Getting Started

- install expo globally (`npm install --global expo-cli`)
- install dependencies: `yarn`
- Recommend clearing all expo & RNE related artifacts:
  `rm -rf ios && rm -rf .expo`

# Unit Testing

We use Jest for unit testing and leverage the
[React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
and the
[React Hooks Testing Library](https://github.com/testing-library/react-hooks-testing-library)
specifically.

