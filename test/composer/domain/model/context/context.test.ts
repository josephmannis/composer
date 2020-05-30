import { Context } from "@model/context/context"
import { Option } from "@model/context/option";

test('New Context Model has no Options', () => {
    let context = new Context('');

    expect(context.options).toStrictEqual([])
})

test('Name of context is equal to the provided one in contruction', () => {
    let context = new Context('test');
    expect(context.name).toStrictEqual('test');
})

test('Context contains no sections on construction', () => {
    let context = new Context('');

    expect(context.getTopLevelSections()).toStrictEqual([])
})

test('Updating Context name persists', () => {
    let context = new Context('');
    context.name = 'test';
    expect(context.name).toStrictEqual('test');
})

test('Updating Context options persists', () => {
    let context = new Context('');
    let newOptions = [new Option('hi', 'hi')];
    context.options = newOptions;
    expect(context.options).toStrictEqual(newOptions);
})

test('Adding section persists and has expected title', () => {
    let context = new Context('');
    context.addSection('title');
    expect(context.getTopLevelSections().length).toBe(1);
    let section = context.getTopLevelSections()[0];
    expect(section.sectionTitle).toStrictEqual('title');
})

test('Adding two sections persists and has expected title', () => {
    let context = new Context('');
    context.addSection('title');
    context.addSection('hello');
    let sections = context.getTopLevelSections()
    expect(sections.length).toBe(2);
    expect(sections.find(s => s.sectionTitle === 'title')).toBeTruthy()
    expect(sections.find(s => s.sectionTitle === 'hello')).toBeTruthy()
})

test('Moving one section underneath another leaves only one top level section', () => {
    let context = new Context('');
    context.addSection('childone');
    context.addSection('childtwo');

    expect(context.getTopLevelSections().length).toStrictEqual(2);
    
    let firstChildId = context.getTopLevelSections().find(s => s.sectionTitle === 'childone')!!.id
    let secondChildId = context.getTopLevelSections().find(s => s.sectionTitle === 'childtwo')!!.id

    context.moveSectionToSection(firstChildId, secondChildId);
    let newTopLevels = context.getTopLevelSections();

    expect(newTopLevels.length).toStrictEqual(1);
    expect(newTopLevels.find(s => s.id === secondChildId)).toBeTruthy()
    expect(newTopLevels.find(s => s.id === firstChildId)).toBeFalsy()
})

test('Moving one section underneath another leaves only one top level section with nested children', () => {
    let context = new Context('');
    context.addSection('childone');
    context.addSection('childtwo');
    context.addSection('childthree');
    
    let firstChildId = context.getTopLevelSections().find(s => s.sectionTitle === 'childone')!!.id
    let secondChildId = context.getTopLevelSections().find(s => s.sectionTitle === 'childtwo')!!.id
    let thirdChildId = context.getTopLevelSections().find(s => s.sectionTitle === 'childthree')!!.id

    context.moveSectionToSection(firstChildId, secondChildId);
    context.moveSectionToSection(thirdChildId, firstChildId);
    expect(context.getTopLevelSections().length).toStrictEqual(1)
})

test('Moving one section underneath another where the to section does not resolve throws error', () => {
    let context = new Context('');
    context.addSection('childone');

    expect(context.getTopLevelSections().length).toStrictEqual(1);
    
    let firstChildId = context.getTopLevelSections().find(s => s.sectionTitle === 'childone')!!.id

    expect(() => { context.moveSectionToSection(firstChildId, `${firstChildId}fdskjla;fjkdsl;jsakl;fjdksl;afjd`)}).toThrow();
    
    let newTopLevels = context.getTopLevelSections();
    expect(newTopLevels.length).toStrictEqual(1);
})

test('Moving one section underneath another where the from section does not resolve throws error', () => {
    let context = new Context('');
    context.addSection('childone');

    expect(context.getTopLevelSections().length).toStrictEqual(1);
    
    let firstChildId = context.getTopLevelSections().find(s => s.sectionTitle === 'childone')!!.id

    expect(() => { context.moveSectionToSection(`${firstChildId}fdskjla;fjkdsl;jsakl;fjdksl;afjd`, firstChildId)}).toThrow();
    
    let newTopLevels = context.getTopLevelSections();
    expect(newTopLevels.length).toStrictEqual(1);
})

test('Moving section to itself throws error', () => {
    let context = new Context('');
    context.addSection('childone');
    let firstChildId = context.getTopLevelSections().find(s => s.sectionTitle === 'childone')!!.id
    expect(() => { context.moveSectionToSection(firstChildId, firstChildId) }).toThrow()
})

test('Moving section to one of its direct subsections throws error', () => {
    let context = new Context('');
    context.addSection('childone');
    context.addSection('childtwo');
    expect(context.getTopLevelSections().length).toStrictEqual(2)

    let firstChildId = context.getTopLevelSections().find(s => s.sectionTitle === 'childone')!!.id
    let secondChildId = context.getTopLevelSections().find(s => s.sectionTitle === 'childtwo')!!.id

    context.moveSectionToSection(firstChildId, secondChildId);
    expect(() => {  context.moveSectionToSection(secondChildId, firstChildId); }).toThrow()

    expect(context.getTopLevelSections().length).toStrictEqual(1)
})

test('Moving section to one of its ancestor subsections throws error', () => {
    let context = new Context('');
    context.addSection('childone');
    context.addSection('childtwo');
    context.addSection('childthree');
    
    let firstChildId = context.getTopLevelSections().find(s => s.sectionTitle === 'childone')!!.id
    let secondChildId = context.getTopLevelSections().find(s => s.sectionTitle === 'childtwo')!!.id
    let thirdChildId = context.getTopLevelSections().find(s => s.sectionTitle === 'childthree')!!.id

    context.moveSectionToSection(firstChildId, secondChildId);
    context.moveSectionToSection(thirdChildId, firstChildId);
    
    expect(() => { context.moveSectionToSection(secondChildId, thirdChildId) }).toThrow()
    expect(context.getTopLevelSections().length).toStrictEqual(1)
})

test('Removing top level section removes all children', () => {
    let context = new Context('');
    context.addSection('childone');
    context.addSection('childtwo');

    expect(context.getTopLevelSections().length).toStrictEqual(2);
    
    let firstChildId = context.getTopLevelSections().find(s => s.sectionTitle === 'childone')!!.id
    let secondChildId = context.getTopLevelSections().find(s => s.sectionTitle === 'childtwo')!!.id
    context.moveSectionToSection(firstChildId, secondChildId);

    context.removeSection(secondChildId)
    let newTopLevels = context.getTopLevelSections();

    expect(newTopLevels).toStrictEqual([])
})

test('Removing top level section does not affect other top level sections', () => {
    let context = new Context('');
    context.addSection('childone');
    context.addSection('childtwo');

    expect(context.getTopLevelSections().length).toStrictEqual(2);

    let firstChildId = context.getTopLevelSections().find(s => s.sectionTitle === 'childone')!!.id
    let secondChildId = context.getTopLevelSections().find(s => s.sectionTitle === 'childtwo')!!.id

    context.removeSection(secondChildId)

    let newTopLevels = context.getTopLevelSections();

    expect(newTopLevels.length).toStrictEqual(1)
    expect(newTopLevels.find(s => s.id === firstChildId)).toBeTruthy()
})

test('Removing subsection does not remove parent', () => {
    let context = new Context('');
    context.addSection('childone');
    context.addSection('childtwo');

    expect(context.getTopLevelSections().length).toStrictEqual(2);
    
    let firstChildId = context.getTopLevelSections().find(s => s.sectionTitle === 'childone')!!.id
    let secondChildId = context.getTopLevelSections().find(s => s.sectionTitle === 'childtwo')!!.id
    context.moveSectionToSection(firstChildId, secondChildId);

    context.removeSection(firstChildId)
    let newTopLevels = context.getTopLevelSections();

    expect(newTopLevels.length).toStrictEqual(1)
    expect(newTopLevels.find(s => s.id === secondChildId)).toBeTruthy()
})

test('Removing non-present section throws error', () => {
    let context = new Context('');
    expect(() => { context.removeSection('fdjhsklafdjs') }).toThrow()
})

test('Updating section name persists', () => {
    let context = new Context('');
    context.addSection('childone');

    let firstChildId = context.getTopLevelSections().find(s => s.sectionTitle === 'childone')!!.id
    context.updateSectionName(firstChildId, 'name')

    expect(context.getTopLevelSections().find(s => s.id === firstChildId)?.sectionTitle).toStrictEqual('name')
})

test('Updating section name on missing section throws error', () => {
    let context = new Context('');
    expect(() => { context.updateSectionName('fdjhsklafdjs', 'name') }).toThrow()
})

test('Updating section options persists', () => {
    let context = new Context('');
    context.addSection('childone');

    let ops = [new Option('a','b')]
    let firstChildId = context.getTopLevelSections().find(s => s.sectionTitle === 'childone')!!.id
    context.setOptionsForSection(firstChildId, ops)

    expect(context.getTopLevelSections().find(s => s.id === firstChildId)?.options).toStrictEqual(ops)
})

test('Updating section options with missing section throws error', () => {
    let context = new Context('');
    expect(() => { context.setOptionsForSection('fdjhsklafdjs', [new Option('a','b')]) }).toThrow()
})