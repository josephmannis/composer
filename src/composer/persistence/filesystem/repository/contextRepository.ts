import { Context } from "@model/context/context";
import { IFileManager, JSONFileManager } from "@main/persistence/filesystem/util/fileManager";
import { basePath, userDataPaths } from "@main/persistence/filesystem/util/pathProvider";
import { IContextRepository } from "@model/context/repository";


export class ContextRepository implements IContextRepository {
    private fileManager: IFileManager;
    private basePath = `${basePath()}/${userDataPaths.CONTEXT}`;

    constructor(fileManager: IFileManager = new JSONFileManager()) {
        this.fileManager = fileManager;
    }

    getAll(): Promise<Context[]> {
        return new Promise((resolve, reject) => {
            try {
                let items = this.fileManager.getDirectoryContents(this.basePath);
                let parsedContexts = items.map(i => JSON.parse(i));
                resolve(parsedContexts);
            } catch(error) {
                reject(`Error fetching all contexts: ${error}`);
            }
        })
    }

    get(id: string): Promise<Context> {
        try {
            let file = this.fileManager.readFile(this.getPath(id));
            let aggregate = JSON.parse(file);
            // TODO: This will cause unpredictable results if the file is malstructured I believe. Should do some kind of type guard
            return aggregate;
        } catch (error) {
            throw new Error(`Error fetching the Context with ID ${id}: ${error}`);
        }
    }

    save(model: Context): Promise<Context> {
        return this.writeContextAggregate(model);
    }

    delete(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                this.fileManager.deleteFile(this.getPath(id));
                resolve()
            } catch (error) {
                reject(`There was an error deleting the Context: ${error}`);
            }
        })
    }
    
    private writeContextAggregate(model: Context): Promise<Context> {
        return new Promise((resolve, reject) => {
            try {
                this.fileManager.writeFile(this.getPath(model.id), JSON.stringify(model));
                resolve(model);
            } catch(error) {
                reject(`There was an error writing the Context: ${error}`);
            }
        })
    }

    private getPath(id: string): string {
        return `${this.basePath}/${id}.json`;
    }
}
