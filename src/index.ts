import requestPromise, { RequestPromiseOptions } from "request-promise";
const request = requestPromise;
import { UriOptions } from "request";
import { URLSearchParams } from "url";
import { NpmSearchParams, NpmRegistryPackage, NpmSearchResult} from "./types"

export default function npmSearch(search: NpmSearchParams): Promise<NpmRegistryPackage[]> {
    return new Promise((resolve, reject) => {
        /**
         * On the site npmjs.com only 20 found packages can be displayed on a single page.
         * Therefore, we need to make several requests with the page url parameter.
         */
        request(createRequestParams(search))
            .then((data) => {
                const allFoundPackages: NpmRegistryPackage[] = getPackages(data);
                resolve(allFoundPackages)
            })
            .catch(err => reject(err))
    })
}

function createRequestParams(options: NpmSearchParams, page?: number): RequestPromiseOptions & UriOptions  { // RequestPromiseOptions and UriOptions type
    const searchParams = new URLSearchParams();                                                              // from @types/request-promise package

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
        },
        json: true
    }
}

function getPackages(data: NpmSearchResult): NpmRegistryPackage[] {
    return data.objects.map(p => p.package)
}

