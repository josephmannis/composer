import { Context } from "./context";

export interface IContextRepository { 
    getAll(): Promise<Context[]>;
    get(id: string): Promise<Context>;
    delete(id: string): Promise<void>;
    save(model: Context): Promise<Context>;
};