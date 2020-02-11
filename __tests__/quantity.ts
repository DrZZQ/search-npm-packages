import npmSearch from "../src";

test('Quantity not a multiple 20', () => {
    npmSearch({
        name: 'cli',
        quantity: 58
    }).then(list => {
        expect(list.length).toBe(58)
    }).catch(err => {
        throw new Error(err)
    })
});

test('Quantity less than 20', () => {
    npmSearch({
        name: 'css',
        quantity: 4
    }).then(list => {
        expect(list.length).toBe(4)
    }).catch(err => {
        throw new Error(err)
    })
});

test('Quantity equals 20', () => {
    npmSearch({
        name: 'mobile',
        quantity: 20
    }).then(list => {
        expect(list.length).toBe(20)
    }).catch(err => {
        throw new Error(err)
    })
});

