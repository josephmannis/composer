import { IFileManager } from "@main/persistence/database/fileManager";
import { mock } from 'jest-mock-extended';
import { ContextService } from "@application/service/context/service";

// jest.mock("@/composer/persistence/database/fileManager");

// const mockFileService = mocked(IFileManager, true);

describe('When there are no contexts, getting all returns an empty list', () => {
    const mockFileManager = mock<IFileManager>();
    mockFileManager.getDirectoryContents.mockReturnValue([]);
    let service = new ContextService(mockFileManager);

    expect(service.all()).toBe([])
})

const service = new ContextService();

