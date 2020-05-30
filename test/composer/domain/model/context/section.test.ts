import { ContextSection } from "@model/context/section"
import { Option } from "@model/context/option";

test('Section is initialized correctly', () => {
    let section = new ContextSection('');
    expect(section.getParent()).toBeUndefined()
    expect(section.options).toStrictEqual([])
    expect(section.sectionTitle).toStrictEqual('')
    expect(section.subSections).toStrictEqual([])
})

test('Two sections are initialized with different IDs', () => {
    let one = new ContextSection('');
    let two = new ContextSection('');
    expect(one.id === two.id).toBeFalsy()
})

test('Setting section title is persisted', () => {
    let section = new ContextSection('');
    section.sectionTitle = 'p0ggers'
    expect(section.sectionTitle).toStrictEqual('p0ggers')
})

test('Setting section options is persisted', () => {
    let section = new ContextSection('')
    let opt = new Option('boom', 'clapthesoundofmyheartthebeatgoesonandonandonandonandonon');
    section.options = [opt]
    expect(section.options.length).toStrictEqual(1)
    expect(section.options.includes(opt)).toBeTruthy()
    section.options = []
    expect(section.options.length).toStrictEqual(0)
    expect(section.options.includes(opt)).toBeFalsy()
})

test('Adding subsection sets subsections parent to section', () => {
    let parent = new ContextSection('')
    let child = new ContextSection('')
    expect(child.getParent()).toBeUndefined()
    parent.addSubSection(child);
    expect(child.getParent()?.id).toStrictEqual(parent.id)
})

test('Adding subsection is persisted in parent sections subsections', () => {
    let parent = new ContextSection('')
    let child = new ContextSection('')
    expect(parent.subSections).toStrictEqual([])
    
    parent.addSubSection(child);
    
    expect(parent.subSections.includes(child)).toBeTruthy()
    expect(parent.subSections.length).toStrictEqual(1)
})

test('Cannot add section to its own direct subsections', () => {
    let parent = new ContextSection('')
    expect(() => { parent.addSubSection(parent) }).toThrowError('Cannot set section to a subsection of itself')
})

test('Cannot add section to any of its ancestor subsections', () => {
    let parent = new ContextSection('')
    let directChild = new ContextSection('')
    let ancestorChild = new ContextSection('')

    parent.addSubSection(directChild)
    directChild.addSubSection(ancestorChild)

    expect(() => ancestorChild.addSubSection(parent)).toThrow()
})

test('Cannot add a subsection that is already a direct subsection', () => {
    let parent = new ContextSection('')
    let directChild = new ContextSection('')
    parent.addSubSection(directChild)
    expect(() =>{ parent.addSubSection(directChild)}).toThrow()
    expect(parent.subSections.length).toStrictEqual(1)
})

test('Adding a subsection that is an ancestor section but not direct subsection works', () => {
    let parent = new ContextSection('')
    let directChild = new ContextSection('')
    let ancestorChild = new ContextSection('')
    
    parent.addSubSection(directChild)
    directChild.addSubSection(ancestorChild)
    
    // Adding to direct child worked
    expect(directChild.subSections.includes(ancestorChild)).toBeTruthy()
    expect(directChild.subSections.length).toStrictEqual(1)

    // parent still only has one direct child, and its the directChild
    expect(parent.subSections.length).toStrictEqual(1)
    expect(parent.subSections.includes(directChild)).toBeTruthy()
    
    // Reset parent
    parent.addSubSection(ancestorChild)

    // Ancestor child's parent is the directChild
    expect(ancestorChild.getParent()?.id).toStrictEqual(parent.id)
    expect(parent.subSections.includes(ancestorChild)).toBeTruthy()
    // Still has old child
    expect(parent.subSections.includes(directChild)).toBeTruthy()
    // Has two top level children
    expect(parent.subSections.length).toStrictEqual(2)

    // directChild no longer has children
    expect(directChild.subSections).toStrictEqual([])
})

test('Removing subsection sets subsections parent to undefined', () => {
    let parent = new ContextSection('')
    let child = new ContextSection('')
    parent.addSubSection(child);
    parent.removeSubSection(child);
    expect(child.getParent()).toBeUndefined()
})

test('Removing subsection removes subsection from parents subsections', () => {
    let parent = new ContextSection('')
    let child = new ContextSection('')
    parent.addSubSection(child);
    parent.removeSubSection(child);
    expect(parent.subSections).toStrictEqual([])
})

test('When removing a subsection, other subsections in the parent\'s subsections are unaffected', () => {
    let parent = new ContextSection('')
    let child = new ContextSection('')
    let otherChild = new ContextSection('')

    parent.addSubSection(child)
    parent.addSubSection(otherChild)

    parent.removeSubSection(otherChild)

    expect(parent.subSections.length).toStrictEqual(1)
    expect(parent.subSections.includes(child)).toBeTruthy()
})

test('Removing subsection that is not direct subsection of parent throws error', () => {
    let parent = new ContextSection('')
    let child = new ContextSection('')
    let otherChild = new ContextSection('')

    parent.addSubSection(child)
    expect(() => { parent.removeSubSection(otherChild) }).toThrow()
})

test('Removing subsection that is ancestor subsection of parent throws error', () => {
    let parent = new ContextSection('')
    let child = new ContextSection('')
    let otherChild = new ContextSection('')

    parent.addSubSection(child)
    child.addSubSection(otherChild)

    expect(() => { parent.removeSubSection(otherChild) }).toThrow()
})
