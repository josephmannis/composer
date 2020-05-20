import { Option } from '@model/context/option';
import { v4 } from 'uuid';

/**
 * A section of Options within a Context. A Section is a logical grouping created by a user to 
 * organize Options. Sections may also have Subsections, which are used for further organization.
 * 
 * Any number of Options may be added.
 * 
 * There is no limit as to how many subsections a Section may contain. 
 */
export class Section {
    readonly id: string;
    private _sectionTitle: string;
    private _options: Option[];
    private _subSections: Section[];

    constructor(sectionTitle: string) {
        this.id = v4();
        this._sectionTitle = sectionTitle;
        this._options = [];
        this._subSections = [];
    }
    
    get sectionTitle(): string {
        return this._sectionTitle;
    }

    set sectionTitle(newTitle: string) {
        this._sectionTitle = newTitle;
    }

    get options(): Option[] {
        return [...this._options];
    }

    set options(options: Option[]) {
        this._options = options;
    }

    get subSections(): Section[] {
        return [...this._subSections];
    }

    addSubsection(section: Section) {
        this._subSections = [...this._subSections, section];
    }

    removeSubsection(subsectionId: string) {
        this._subSections = this._subSections.filter(s => s.id !== subsectionId);
    }

    // addOption(option: Option) {
    //     if (this._options.find(o => o.name === option.name)) throw new Error(`This section already contains an option with the name ${option.name}.`);
    //     this._options = [...this._options, option];
    // }

    // removeOption(option: Option) {
    //     this._options = this._options.filter(o => o !== option);
    // }

    // updateOption(oldOption: Option, newOption: Option) {
    //     this._options = this._options.map(o => o === oldOption ? newOption: o);
    // }
}