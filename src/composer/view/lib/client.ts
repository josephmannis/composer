export interface IContext {
    id: string;
    name: string;
    sections: ISection[];
}

export interface ISection {
    id: string;
    sectionTitle: string;
    options: IOption[];
    subSections: ISection[];
}

export interface IOption { 
    name: string;
    phrase: string;
}

export interface IComposition {
    sections: ICompositionSection[];
}

export interface ICompositionSection {
    id: string;
    text: string;
}