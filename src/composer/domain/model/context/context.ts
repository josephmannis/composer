import { v4 } from "uuid";
import { Option } from '@model/context/option';
import { ContextSection } from "./section";
import _ from "lodash";

/**
 * This is the main aggregate of the domain. It handles the business logic
 * for managing sections within a context, managing an options sections, etc.
 */
// TODO: Extend Aggregate
export class Context {
    readonly id: string;
    private _name: string;
    // Could be a B+ tree 
    private _sections: Map<string, ContextSection>;
    private _options: Option[];

    constructor(name: string) {
        this.id = v4();
        this._name = name;
        this._sections = new Map();
        this._options = [];
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }
    
    get options(): Option[] {
        return [...this._options];
    }

    getTopLevelSections(): ContextSection[] {
        let result = [];

        for (let child of this._sections.values()) {
            if (child.getParent() === undefined) result.push(_.cloneDeep(child));
        }

        return result;
    }

    set options(options: Option[]) {
        this._options = options;
    }

    addSection(sectionTitle: string) {
        let newSection = new ContextSection(sectionTitle);
 
        this._addSection(newSection);
    }
    
    removeSection(sectionId: string) {
        // Remove from parent
        this._removeSectionFromParent(sectionId);
        
        // TODO: Make sure the children don't stay in memory
        this._sections.delete(sectionId)
    }

    moveSectionToSection(sectionId: string, parentId: string) {
        let section = this._getSection(sectionId);
        let toSection = this._getSection(parentId);

        toSection.addSubSection(section);
    }

    moveSectionToTopLevel(sectionId: string) {
        // Remove parent
        this._removeSectionFromParent(sectionId);
    }

    updateSectionName(sectionId: string, name: string) {
        let section = this._getSection(sectionId);
        section.sectionTitle = name;
    }

    setOptionsForSection(sectionId: string, options: Option[]) {
        let section = this._getSection(sectionId);
        section.options = options;
    }

    private _removeSectionFromParent(sectionId: string) {
        let section = this._getSection(sectionId);
        // FIXME: Don't think this works because of deeplc
        let parent = section.getParent();
        if (parent) {
            let parentRef = this._getSection(parent.id);
            parentRef.removeSubSection(section);
        }
    }

    private _addSection(section: ContextSection) {
        this._sections.set(section.id, section);
    }

    private _getSection(sectionId: string): ContextSection {
        let section = this._sections.get(sectionId);
        if (!section) throw new Error(`Could not find section with id ${sectionId}`);
        return section;
    }
}