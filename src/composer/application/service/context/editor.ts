import { ContextRepository } from "@main/persistence/filesystem/repository/contextRepository";
import { IContextRepository } from "@model/context/repository";
import { Context } from "@model/context/context";
import { IOption } from "@view/lib/client";


/**
 * Service to edit the content of Contexts, as well as create or delete them.
 */
interface IContextEditorService {
    /** 
    * Create a new context.
    * @param name The name of the new context.
    * @returns The updated context
    */
    createContext(name: string): Promise<Context>;
    
    /**
     * Delete a context with the given id. 
     * @param contextId 
     */
    deleteContext(contextId: string): Promise<void>;

    /**
     * Update the name for a context with the given id.
     * @param contextId The ID of the context
     * @param name The new name
     * @returns The updated context
     */
    setContextName(contextId: string, name: string): Promise<Context>;

    /**
     * Adds a new section to a context j
     * @param contextId 
     * @param title 
     */
    addNewSectionToContext(contextId: string, sectionTitle: string): Promise<Context>;
    removeSectionFromContext(contextId: string, sectionId: string): Promise<Context>;
    updateOptionsForSection(contextId: string, options: IOption[], sectionId: string): Promise<Context>;
}


export class ContextEditorService implements IContextEditorService {
    private repository: IContextRepository;
    
    constructor(repository: IContextRepository = new ContextRepository()) {
        this.repository = repository;
    }

    createContext(name: string): Promise<Context> {
        return new Promise((resolve, reject) => {
            let model = new Context(name);
            this.repository.save(model)
            .then( newModel => resolve(newModel))
            .catch(error => reject(`Error creating context: ${error}`));
        })
    }

    deleteContext(contextId: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.repository.delete(contextId)
            .then(res => resolve())
            .catch(error => reject(`Error deleting context: ${error}`));
        })
    }

    setContextName(contextId: string, name: string): Promise<Context> {
        return this._makeContextEdit(contextId, (model) => {
            model.name = name;
            return model;
        }, 'Error updating context name')
    }

    addNewSectionToContext(contextId: string, sectionTitle: string): Promise<Context> {
        return this._makeContextEdit(contextId, (model) => {
            model.addSection(sectionTitle);
            return model;
        }, 'Error adding section to context')
    }

    removeSectionFromContext(contextId: string, sectionId: string): Promise<Context> {
        return this._makeContextEdit(contextId, (model) => {
            model.removeSection(sectionId);
            return model;
        }, 'Error removing section from context')
    }

    updateOptionsForSection(contextId: string, options: IOption[], sectionId: string): Promise<Context> {
        return this._makeContextEdit(contextId, (model) => {
            model.setOptionsForSection(sectionId, options);
            return model;
        }, 'Error updating options for context')
    }

    private _makeContextEdit(contextId: string, editFunc: (model: Context) => Context, errorMessage: String): Promise<Context> {
        return new Promise((resolve, reject) => {
            this.repository.get(contextId)
            .then(model => {
                let editedModel = editFunc(model);
                return editedModel;
            }).then(model => {
                return this.repository.save(model);
            }).then(model => {
                resolve(model);
            }).catch(error => {
                reject(`${errorMessage}: ${error}`);
            });
        })
    }
}