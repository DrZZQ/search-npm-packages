import npmSearch from "./index";

npmSearch({
    name: 'test',
    quantity: 20
})
    .then(list => {
        console.log(JSON.stringify(list, null, 2))
    })
    .catch(e => console.error(e));