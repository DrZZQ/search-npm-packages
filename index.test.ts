import npmSearch, { NpmSearchOptions } from "./index";

const npmSearchParam: NpmSearchOptions = {
    name: 'install new filew',
    keywords: [
        "apt",
        "user"
    ]
};

npmSearch('test')
    .then(d => console.log(d ))
    .catch(e => console.log(e));

