import { mkdirSync, existsSync } from 'fs';
import { userDataPaths, basePath } from '../persistence/util/pathProvider';

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
    for (let path of Object.values(paths)) {
        const dataPath = `${basePath()}/${path}`
        try {
            if (!existsSync(dataPath)) {  
                console.info(`Creating directory for ${dataPath}`);
                mkdirSync(dataPath);
            }
        } catch (error) {
            console.error(`WARNING: Failed to initialize user data directory for ${dataPath}.\nStacktrace: ${error}`)
        }
    }
    console.groupEnd();
}