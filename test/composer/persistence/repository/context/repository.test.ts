import { mock } from 'jest-mock-extended';
import { ContextService } from "@application/service/context/service";
import { IContextRepository } from "@main/persistence/filesystem/repository/contextRepository";

// jest.mock("@/composer/persistence/database/fileManager");

// const mockFileService = mocked(IFileManager, true);

test('When there are no contexts, getting all returns an empty list', () => {
    const mockRepository = mock<IContextRepository>();

    mockRepository.all.mockImplementation(() => {
        return new Promise((resolve) => resolve([]));
    })

    let service = new ContextService(mockRepository);

    return service.getAll().then(res => {
        expect(res).toEqual([])
    })
});







