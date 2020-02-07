import request from "request";

export type NpmSearchParams = {
    name?: string
    keywords?: string[]
    ranking?:  'optimal' |
        'maintenance' |
        'popularity' |
        'quality'
}

export default function npmSearch(search: NpmSearchParams): Promise<object> {
    return new Promise((resolve, reject) => {
        request({
            method: 'GET',
            uri: 'https://npmjs.com/search?q=' + search.name,
            headers: {
                'Accept': 'application/json',
                'x-requested-with': 'XMLHttpRequest',
                'x-spiferack': 1
            }
        }, (err, res, body) => {
           resolve(JSON.parse(body).objects)
        })
    })
}