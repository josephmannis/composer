import { mkdirSync, existsSync } from 'fs';
import { app, remote } from 'electron';
import { userDataPaths } from '../persistence/util/pathProvider';

// TODO: if this gets bigger, probably want to add some kind of check to see if its the first run
export function install() {
    initializeUserData();
}

/**
 * Set up all the directories for user data.
 */
function initializeUserData(): void {
    console.group('Install process:')
    console.info('Running install script...')
    const paths = userDataPaths;
    const base = (app || remote.app).getPath('userData');

    for (let value of Object.values(paths)) {
        let path = `${base}/${value}`;
        
        try {
            if (!existsSync(path)) {
                console.info(`Creating directory for ${path}`);
                mkdirSync(path);
            }
        } catch (error) {
            console.error(`WARNING: Failed to initialize user data directory for ${value}. Error: ${error}`)
        }
    }
    console.groupEnd();
}