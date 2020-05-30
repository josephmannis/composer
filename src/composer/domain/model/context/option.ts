import { v4 } from "uuid";

/**
 * Value object for an Option, which is one phrase
 * that can be selected from a Section.
 */
export class Option {
    readonly name: string;
    readonly phrase: string;

    constructor(name: string, phrase: string) {
        this.name = name;
        this.phrase = phrase;
    }
}