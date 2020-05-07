# Composer
Quick application for composing text based on selected options.

## Getting started
```
git clone https://github.com/iamWing/electron-react-typescript-base-proj.git
```

Then install all the `node_modules` needed by executing the following command:
```sh
cd composer
yarn
```

Finally execute the following command to start Webpack in development mode and 
watch the changes on source files for live rebuild on code changes.
```sh
yarn run dev
```

The `yarn run dev` command won't start your app and get your app shows on the 
screen. To start your app, in another terminal window, execute the following command:
```sh
yarn start
```

To see changes, click on the window of the application and hit `Command + R` to refresh.

## Changing the data
Open the file in `src/data/composerData.json`.

Edit, add, or remove sections there. Sections must adhere to the following structure:

```
{
    "sections": [
      {
            "sectionTitle": "<title>",
            "options": [
                {
                    "name": "<name>",
                    "phrase": "<phrase>"
                },
                ...More options
            ]
        },
        ...More sections
    ]
}
```

You will need to restart the app to see these changes.

## Building the installer 
The boilerplate is currently configured to package & build the installer of 
your app for macOS & Windows using `electron-builder`. 

For macOS, execute:
```sh
yarn run build:mac
```

For Windows, execute:
```sh
yarn run build:win
```
_** `asar` archiving is disabled by default in Windows build as it can cause 
errors while running the installed Electron app based on pervious experiences, 
whereas the macOS build with `asar` enabled works just fine. You can turn it 
back on by removing line 23 (`"asar": false`) in `package.json`. **_


## Known issues

- `dmg` build action on `macOS Catalina (10.15)` fails due to Apple ditches 
  support for 32-bit apps from `10.15` onwards (Don't worry, you are still 
  building 64-bit apps, just some dependencies of the builder are still 32-bit).
  Further details retailed to this issue can be found 
  [here](https://github.com/electron-userland/electron-builder/issues/3990).  
  Application installer built on `macOS` is now set to build `pkg` file 
  instead of `dmg` as a workaround in the current version. The issue can be 
  fixed by applying a major version upgrade of `electron-builder` to `21.2.0+` 
  but it hasn't been tested on this boilerplate yet. This issue is planned to 
  be addressed alongside with major version upgrades on other dependencies.


## Credits
Bootstrapped with Electron React TypeScript Webpack Boilerplate:
[Wing Chau](https://github.com/iamWing) [@Devtography](https://github.com/Devtography)


## License
Composer is open source software 
[licensed as MIT](LICENSE).

