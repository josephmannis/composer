
export interface IContextAggregate {
    id: string;
    model: IPersistedContextModel;
}

export interface IPersistedContextModel { 
    name: string;
    sections: IPersistedSectionModel[];
}

interface IPersistedSectionModel {
    sectionTitle: string;
    options: IPersistedOptionModel[];
    subSections: IPersistedSectionModel[];
}

interface IPersistedOptionModel {
    name: string;
    phrase: string;
}