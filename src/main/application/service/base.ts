export interface IService<T, U> {
    all(): Promise<T[]>;
    select(id: string): Promise<T>;
    create(model: U): Promise<T>;
    update(id: string, model: U): Promise<T>;
    delete(id: string): void;
}