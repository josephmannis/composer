import { Option } from '@model/context/option';
import { v4 } from 'uuid';
import _ from 'lodash';

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
    private _subSections: ContextSection[];

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

    getParent(): ContextSection | undefined {
        return _.cloneDeep(this._parent);
    }

    protected get parent(): ContextSection | undefined {
        return this._parent;
    }

    protected set parent(parent: ContextSection | undefined) {
        this._parent = parent;
    }

    get subSections(): ContextSection[] {
        return [...this._subSections];
    }

    addSubSection(subSection: ContextSection) {
        if (subSection.id === this.id || this._isAncestorOf(subSection)) throw Error('Cannot set section to a subsection of itself.')
        if (this._subSections.includes(subSection)) throw new Error('Subsection is already a direct subsection of this section.')
        
        // Remove old parent
        if (subSection.parent) {
            subSection.parent.removeSubSection(subSection);
        }

        // Set parent to this
        subSection.parent = this;
        
        // Add to children
        this._subSections = [...this._subSections, subSection];
    }

    removeSubSection(subSection: ContextSection) {
        if (!this._subSections.includes(subSection)) throw Error(`Section with id ${subSection.id} is not a direct subsection of this section.`);

        // Remove parent
        subSection._parent = undefined;
        // Remove from children
        this._subSections = this._subSections.filter(s => s.id !== subSection.id);
    }

    protected _isAncestorOf(section: ContextSection): boolean {
        // If parent is undefined, this section is not an ancestor of anything
        if (!this._parent) return false;
        // If this section's parent is equal to the section, then yes
        if (this._parent.id === section.id) return true;
        // Check if parents further up the chain meet this criteria
        return this._parent._isAncestorOf(section);
    }
}