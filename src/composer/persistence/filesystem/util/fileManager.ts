import { readFileSync, writeFileSync, unlinkSync, readdirSync } from "fs";

export interface IFileManager {
    /**
     * Fetches a file from the users data location synchronously. Will throw an error if the file is missing or corrupted.
     * @param path Path to file
     */
    readFile(path: string): string;

    /**
     * Writes a file to the users data location synchronously. Will throw an error if the file is missing or corrupted.
     * @param path Path to file
     * @param data the data, encoded as a string
     */
    writeFile(path: string, data: string): void;


    /**
     * Deletes a file at the given path. Throws an error if the file is not present.
     * @param path
     */
    deleteFile(path: string): void;

    /**
     * Retrieves all files in a directory
     * @param path Path to directory
     */
    getDirectoryContents(path: string): string[];
}

export class JSONFileManager implements IFileManager {    
    readFile(path: string): string {
        try {
            return readFileSync(path).toString()
        } catch (error) {
            throw error;
        }
    }

    writeFile(path: string, data: string) {
        try {
            writeFileSync(path, data);
        } catch (error) {
            throw new Error(`There was an error in writing the file: ${error}`);
        }
    }

    deleteFile(path: string) {
        try {
            unlinkSync(path);
        } catch(error) {
            throw new Error(`Failed to delete file: ${error}}`);
        }
    }

    getDirectoryContents(path: string): string[] {
        try {
            let fileNames = readdirSync(path);
            let files: string[] = [];

            fileNames.forEach(n => {
                let filePath = `${path}/${n}`;
                try {
                    files.push(this.readFile(filePath));
                } catch (error) {
                    console.error(`Failed to read file at ${filePath}`)
                }
            })

            return files;
        } catch(error) {
            throw new Error(`Failed to retrieve files: ${error}}`);
        }
    }
}