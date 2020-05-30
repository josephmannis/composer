import { IQueries } from "../base";
import { Context } from "@model/context/context";
import { IContextRepository } from "@model/context/repository";
import { ContextRepository } from "@main/persistence/filesystem/repository/contextRepository";

export interface IContextLibraryService extends IQueries<Context> { };

export class ContextLibrary implements IContextLibraryService {
    private repository: IContextRepository;
    
    constructor(repository: IContextRepository = new ContextRepository()) {
        this.repository = repository;
    }

    getAll(): Promise<Context[]> {
        return new Promise((resolve, reject) => {
            this.repository.getAll()
            .then(contexts => {
                resolve(contexts);
            }).catch(error => reject(`Error fetching contexts: ${error}`));
            
        })
    }

    get(id: string): Promise<Context> {
        return new Promise((resolve, reject) => {
            this.repository.get(id)
            .then(context => resolve(context))
            .catch(error => reject(`Error fetching contexts: ${error}`));
        })
    }
}