import request, { CoreOptions, UriOptions } from "request";
import { URLSearchParams } from "url";
import { NpmSearchParams, NpmRegistryPackage } from "./types"

export default function npmSearch(search: NpmSearchParams): Promise<NpmRegistryPackage[]> {
    return new Promise((resolve, reject) => {
        /**
         * On the site npmjs.com only 20 found packages can be displayed on a single page.
         * Therefore, we need to make several requests with the page url parameter.
         */
        request(createRequestParams(search), (err, res, body) => {
            if (err) reject(err);
            const allFoundPackages: NpmRegistryPackage[] = getPackages(body);
            resolve(allFoundPackages)
        })
    })
}

function createRequestParams(options: NpmSearchParams, page?: number): UriOptions & CoreOptions { // UriOptions & CoreOptions from @types/request package
    const searchParams = new URLSearchParams();

    if (options.name)/*-----*/ searchParams.set('q', options.name);
    if (options.keywords)/*-*/ searchParams.set('q', 'keywords:' + options.keywords.join(' '));
    if (options.ranking)/*--*/ searchParams.set('ranking', options.ranking);
    if (page)/*-------------*/ searchParams.set('page', String(page));

    return {
        method: 'GET',
        uri: 'http://npmjs.com/search?' + searchParams.toString(),
        headers: {
            'Accept': 'application/json',
            'x-requested-with': 'XMLHttpRequest',
            'x-spiferack': 1
        }
    }
}

function getPackages(body: string): NpmRegistryPackage[] {
    return JSON.parse(body).objects.map(p => p.package)
}

