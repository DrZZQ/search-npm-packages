import requestPromise, { RequestPromiseOptions } from "request-promise";
import { UriOptions } from "request";
import { URLSearchParams } from "url";
import { NpmSearchParams, NpmRegistryPackage, NpmSearchResult} from "./types"
const request = requestPromise;

export default function npmSearch(search: NpmSearchParams): Promise<NpmRegistryPackage[]> {
    return new Promise((resolve, reject) => {
        /**
         * On the site npmjs.com only 20 found packages can be displayed on a single page.
         * Therefore, we need to make several requests with the page url parameter.
         */
        if (search.quantity > 20) {

            request(createRequestParams(search))
                .then(async data => {
                    const totalFoundedPackages = data.total;
                    const allPackages: NpmRegistryPackage[] = getPackages(data);

                    let requestCount: number;
                    if (search.quantity > totalFoundedPackages) {
                        requestCount = (totalFoundedPackages / 20) - 1
                    } else {
                        requestCount = (search.quantity / 20) - 1
                    }

                    for (let i = 0; i < requestCount; i++) {
                        const searchResult = await request(createRequestParams(search, i))
                            .catch(err => reject(err));
                        const packages = getPackages(searchResult);
                        packages.forEach(p => allPackages.push(p))
                    }

                    resolve(allPackages)
                })
                .catch(err => err)

        } else {
            request(createRequestParams(search))
                .then((data) => resolve(getPackages(data)))
                .catch(err => reject(err))
        }
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

