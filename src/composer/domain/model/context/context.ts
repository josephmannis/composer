import { v4 } from "uuid";
import { Option } from '@model/context/option';
import { Section } from "./section";
/**
 * This is the main aggregate of the domain. It handles the business logic
 * for managing sections within a context, managing an options sections, etc.
 */
// TODO: Extend Aggregate
export class Context {
    readonly id: string;
    private _name: string;
    // Use a map here for easy intermediary access to the recursive structure
    // TODO: Could probably make everything make way more sense as a tree though, possibly remove subsectios from Section model
    private _sections: Map<string, Section>;

    constructor(name: string) {
        this.id = v4();
        this._name = name;
        this._sections = new Map();
    }

    get sections(): Section[] {
        return [...this._sections.values()];
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }
    
    addSection(section: Section) {
        this._sections.set(section.id, section);
    }
    
    // TODO: Might be wack
    removeSection(sectionId: string) {
        this._sections.forEach(s => s.removeSubsection(sectionId));
        if (!this._sections.delete(sectionId)) console.warn(`Delete Section: Could not find section with ID ${sectionId}`);
    }

    addSubsectionToSection(parentSectionId: string, section: Section) {
        let parent = this.getSection(parentSectionId);

        // Add to parent's subsections
        parent.addSubsection(section);

        // Remember section for later
        this._sections.set(section.id, section);
    }

    updateSectionName(sectionId: string, name: string) {
        let section = this.getSection(sectionId);
        section.sectionTitle = name;
    }

    addOptionToSection(option: Option, sectionId: string) {
        let section = this.getSection(sectionId);
        section.addOption(option);
    }

    removeOptionFromSection(option: Option, sectionId: string) {
        let section = this.getSection(sectionId);
        section.removeOption(option);
    }

    updateOptionInSection(option: Option, newOption: Option, sectionId: string) {
        let section = this.getSection(sectionId);
        section.updateOption(option, newOption);
    }

    private getSection(sectionId: string): Section {
        let section = this._sections.get(sectionId);
        if (!section) throw new Error(`Could not find section with id ${sectionId}`);
        return section;
    }
}