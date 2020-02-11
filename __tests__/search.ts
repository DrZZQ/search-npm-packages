import npmSearch from "../src";

test('Simple search', () => {
    npmSearch({ name: 'tests' }).then(list => {
        expect(list.length).toBe(20)
    }).catch(err => {
        throw new Error(err)
    })
});

test('Keywords search', () => {
    npmSearch({ keywords: ['cli', 'backend'] }).then(list => {
        expect(list.length).toBe(20)
    }).catch(err => {
        throw new Error(err)
    })
});

test('Ranking search', () => {
    npmSearch({
        name: 'http',
        ranking: "quality"
    }).then(list => {
        expect(list.length).toBe(20)
    }).catch(err => {
        throw new Error(err)
    })
})

test('Quantity search', () => {
    npmSearch({
        name: 'cli',
        quantity: 40
    }).then(list => {
        expect(list.length).toBe(40)
    }).catch(err => {
        throw new Error(err)
    })
});

