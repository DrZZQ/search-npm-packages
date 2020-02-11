import npmSearch from "../src";

test('Example test', () => {
    return npmSearch({ name: 'tests' }).then(list => {
        expect(list).toBeDefined()
    }).catch(err => {
        throw new Error(err)
    })
});