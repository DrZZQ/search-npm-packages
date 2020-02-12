const npmSearch = require("../dist/index");

jest.setTimeout(30000);

// FIXME: Make promise test normal :(
test('Simple search', () => {
    return expect(npmSearch({ name: 'tests' }))
        .resolves.toHaveLength(20);
});


