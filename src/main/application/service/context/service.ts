import { IFileManager, JSONFileManager } from "@/main/persistence/database/fileManager";
import { IContextAggregate, IPersistedContextModel } from "@/main/domain/model/context/model";
import { IService } from "../base";
import { v4 } from "uuid";
import { userDataPaths } from "@/main/persistence/util/pathProvider";


const CONTEXT_PATH = userDataPaths.CONTEXT;

/**
 * Service that handles CRUD for Contexts. This is really more of a repository, but adding a repository
 * is an unnecessary layer of abstraction for the moment. In the future, it would be better to put business
 * operations on this and delegate all of the filesystem interaction to a Context repository.
 */
export class ContextService implements IService<IContextAggregate, IPersistedContextModel> {
    private fileManager: IFileManager;
    
    constructor(fileManager: IFileManager = new JSONFileManager()) {
        this.fileManager = fileManager;
    }

    all(): Promise<IContextAggregate[]> {
        return new Promise((resolve, reject) => {
            try {
                let items = this.fileManager.getDirectoryContents(this.getBasePath());
                let parsedContexts = items.map(i => JSON.parse(i));
                resolve(parsedContexts);
            } catch(error) {
                reject(`Error fetching all contexts: ${error}`);
            }
        })
    }

    select(id: string): Promise<IContextAggregate> {
        try {
            let file = this.fileManager.readFile(this.getPath(id));
            let aggregate = JSON.parse(file);
            // TODO: This will cause unpredictable results if the file is malstructured I believe. Should do some kind of type guard
            return aggregate;
        } catch (error) {
            throw new Error(`Error fetching the Context with ID ${id}: ${error}`);
        }
    }

    create(model: IPersistedContextModel): Promise<IContextAggregate> {
        return this.writeContextAggregate(v4(), model);

    }

    update(id: string, model: IPersistedContextModel): Promise<IContextAggregate> {
        return this.writeContextAggregate(id, model);
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

    private writeContextAggregate(id: string, model: IPersistedContextModel): Promise<IContextAggregate> {
        // TODO: At scale, move to a Factory
        let aggregate: IContextAggregate = {
            id: id,
            model: model
        }

        return new Promise((resolve, reject) => {
            try {
                this.fileManager.writeFile(this.getPath(id), JSON.stringify(aggregate));
                resolve(aggregate);
            } catch(error) {
                reject(`There was an error writing the Context: ${error}`);
            }
        })
    }
    
    private getBasePath(): string {
        
        return `${CONTEXT_PATH}`
    }

    private getPath(id: string): string {
        return `${this.getBasePath()}/${id}.json`;
    }
}