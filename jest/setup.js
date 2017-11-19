jest.doMock('tipsi-stripe', () => ({
    init: jest.fn(),
}));