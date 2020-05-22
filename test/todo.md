#### Install
- On first install, all directories in userPaths are created


#### Context Model
- Starts off with no options
- Name is equal to provided name on construction
- No subsections on construction
- Set name / get name returns new name
- Set options / get options returns new options
- Adding valid section / getting sections, section is there
- Adding valid section with parent that exists works 
  - Getting parent has section as child
- Adding valid section with missing parent throws error

- Removing section that was there yields no section, and all other sections are there as well
- remove section that doesn't exist throws error
- Remove section deletes all of the children sections as well
- Setting section parent with missing sectionId changes nothing + throws error
- Setting section parent with missing destination parentId changes nothing + throws error

#### Section Model
- Section is initialized with no children and no options, and the title one expects
- Removing a child section -> getting parent -> parent does not have section as child
- Setting section parent with pre-existing parent: 
  - last parent no longer has section as child
  - new parent has section as child
  - section has new parent as parent
  - only one top level section
- Cannot set section parent to itself
- Cannot set parent section to one of its children
- updating section name + getting section shows changes
- updating section name with missing section throws error
- setting options for section works
- setting options for missing section throws error


#### Repository
##### all
- When there are no contexts in the user directories, the size of the list returned is zero
- When there are more than zero.... the size of the list is more than zero
- Promise is rejected when there is an error getting all of them
- Fetching all yields x, adding and then fetching all yields x + 1
- Fetching all yields x, adding and then removing one yields x - 1

##### select
- Select when exists returns one
- Select when not exists throws error
- Promise rejected when filemanager throws

##### create
- Creating and then selected yields a context, and that context has the provided model

##### update
- Should reject if context with ID does not exist
- Should return updated context -> select with provided ID should == returned aggregate's id
- Returned aggregate's model should == provided model

##### delete
- Should not reject if id does not exist
- Context with ID should not exist after delete


#### fileManager
- mock fs:L https://jestjs.io/docs/en/manual-mocks

Component tests...
Cypress tests...