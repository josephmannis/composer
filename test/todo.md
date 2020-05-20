#### Install
- On first install, all directories in userPaths are created

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