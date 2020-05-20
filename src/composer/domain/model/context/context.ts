import { v4 } from "uuid";
import { Option } from '@model/context/option';
import { ContextSection } from "./section";
/**
 * This is the main aggregate of the domain. It handles the business logic
 * for managing sections within a context, managing an options sections, etc.
 */
// TODO: Extend Aggregate
export class Context {
    readonly id: string;
    private _name: string;
    private _sections: Map<string, ContextSection>;

    constructor(name: string) {
        this.id = v4();
        this._name = name;
        this._sections = new Map();
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }
    
    addSection(sectionTitle: string, parentId?: string) {
        let section = new ContextSection(sectionTitle);
        
        if (parentId) {
            let parent = this.getSection(parentId);
            section.parent = parent;
        }

        this._addSection(section);
    }

    private _addSection(section: ContextSection) {
        this._sections.set(section.id, section);
    }
    
    // TODO: Might be wack
    removeSection(sectionId: string) {
        // TODO: Make sure the children don't stay in memory
        if (!this._sections.delete(sectionId)) console.warn(`Delete Section: Could not find section with ID ${sectionId}`);
    }

    setSectionParent(sectionId: string, parentId: string) {
        let section = this.getSection(sectionId);
        let toSection = this.getSection(parentId);

        section.parent = toSection;
    }

    updateSectionName(sectionId: string, name: string) {
        let section = this.getSection(sectionId);
        section.sectionTitle = name;
    }

    setOptionsForSection(sectionId: string, options: Option[]) {
        let section = this.getSection(sectionId);
        section.options = options;
    }

    private getSection(sectionId: string): ContextSection {
        let section = this._sections.get(sectionId);
        if (!section) throw new Error(`Could not find section with id ${sectionId}`);
        return section;
    }
}