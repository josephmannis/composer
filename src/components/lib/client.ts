export interface IEmailSection {
    sectionTitle: string;
    options: IEmailSectionOption[];
}

export interface IEmailSectionOption { 
    name: string;
    phrase: string;
}