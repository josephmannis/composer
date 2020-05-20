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
    addSectionToContext(contextId: string, context: string): Promise<Context>;
    removeSectionFromContext(contextId: string, sectionId: string): Promise<Context>;
    updateOptionsForSection(contextId: string, options: IOption): Promise<Context>;
}


export class ContextEditorService implements IContextEditorService {
    private repository: IContextRepository;
    
    constructor(repository: IContextRepository = new ContextRepository()) {
        this.repository = repository;
    }
    createContext(name: string): Promise<Context> {
        throw new Error("Method not implemented.");
    }
    deleteContext(contextId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    setContextName(contextId: string, name: string): Promise<Context> {
        throw new Error("Method not implemented.");
    }
    addSectionToContext(contextId: string, context: string): Promise<Context> {
        throw new Error("Method not implemented.");
    }
    removeSectionFromContext(contextId: string, sectionId: string): Promise<Context> {
        throw new Error("Method not implemented.");
    }
    updateOptionsForSection(contextId: string, options: IOption): Promise<Context> {
        throw new Error("Method not implemented.");
    }
}