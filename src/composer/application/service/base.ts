export interface IQueries<AggregateType> {
    getAll(): Promise<AggregateType[]>;
    get(id: string): Promise<AggregateType>;
}