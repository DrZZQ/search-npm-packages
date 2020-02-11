import request, { CoreOptions, UriOptions } from "request";
import { URLSearchParams } from "url";

export type RegistryPackage = {
    name: string
    scope: string
    version: string
    description: string
    keywords: string[]
    date: {
        ts: number
        rel: string
    }
    links: {
        npm: string
        homepage?: string
        repository?: string
        bugs?: string
    },
    author?: {
        name: string
        email: string
        useaname: string
    }
    publisher: {
        name: string,
        avatars: {
            small: string
            medium: string
            large: string
        }
        created: {
            ts: number | null
            rel: string
        },
        email: string
    },
    maintainers: Array<{
        username: string
        email: string
    }>
    keywordsTruncated: boolean
}

export type NpmSearchParams = {
    name?: string
    keywords?: string[]
    ranking?: 'optimal' |
        'maintenance' |
        'popularity' |
        'quality'
}

export default function npmSearch(search: NpmSearchParams): Promise<RegistryPackage[]> {
    return new Promise((resolve, reject) => {
        /**
         * On the site npmjs.com only 20 found packages can be displayed on a single page.
         * Therefore, we need to make several requests with the page url parameter.
         */
        request(createRequestParams(search), (err, res, body) => {
            if (err) reject(err);
            const allFoundPackages: RegistryPackage[] = getPackages(body);
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

function getPackages(body: string): RegistryPackage[] {
    return JSON.parse(body).objects.map(p => p.package)
}

