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
export class ContextSection {
    readonly id: string;
    private _sectionTitle: string;
    private _options: Option[];
    private _parent?: ContextSection;

    constructor(sectionTitle: string) {
        this.id = v4();
        this._sectionTitle = sectionTitle;
        this._options = [];
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

    set parent(parent: ContextSection) {
        this._parent = parent;
    }
}