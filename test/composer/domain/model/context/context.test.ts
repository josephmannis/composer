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

test('Adding section without parent has expected title, no parent, and no options', () => {
    let context = new Context('');
    context.addSection('title');
    expect(context.getTopLevelSections().length).toBe(1);
    let section = context.getTopLevelSections()[0];
    expect(section.sectionTitle).toStrictEqual('title');
    expect(section.parent).toBeUndefined();
    expect(section.options).toStrictEqual([]);
    expect(section.subSections).toStrictEqual([]);
})

test('Adding section with parent leaves only one top-level section', () => {
    let context = new Context('');
    context.addSection('parent');
    expect(context.getTopLevelSections().length).toStrictEqual(1);
    let parent = context.getTopLevelSections()[0];

    context.addSection('child', parent.id);
   
    // Parent has subsection
    expect(context.getTopLevelSections()[0].subSections.length).toStrictEqual(1);
    
    // Only one top level section
    expect(context.getTopLevelSections().length).toStrictEqual(1);
})

test('Adding section with parentId that is nonexistent throws error', () => {

})

test('Removing present section is removed', () => {
    
})

test('Removing top level section removes all children', () => {
    
})

test('Removing top level section does not affect other top level sections', () => {
    
})

test('Removing subsection does not remove parent', () => {
    
})

test('Removing non-present section throws error', () => {
    
})

test('Setting section parent with nonexistent section changes nothing and throws error', () => {
    
})

test('Setting section parent with missing parent changes nothing and throws error', () => {
    
})

test('Setting top-level section parent to other top-level section reduces number of top level sections', () => {

})

test('Setting section parent to itself throws error', () => {
    
})

test('Updating section name persists', () => {
    
})

test('Updating section name on missing section throws error', () => {
    
})

test('Updating section options persists', () => {
    
})

test('Updating section options with missing section throws error', () => {
    
})