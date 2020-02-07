import request, {CoreOptions, UriOptions} from "request";
import {URLSearchParams} from "url";
import {Runtime} from "inspector";

export type RegistryPackage = {
    package: {
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
    score: {
        final: number,
        detail: {
            quality: number
            popularity: number
            maintenance: number
        }
    }
    searchScore: number
}

export type NpmSearchParams = {
    name?: string
    keywords?: string[]
    ranking?: 'optimal' |
        'maintenance' |
        'popularity' |
        'quality'
}

export default function npmSearch(search: NpmSearchParams): Promise<Array<RegistryPackage>> {
    return new Promise((resolve, reject) => {
        request(createRequestParams(search), (err, res, body) => {
            if (err) reject(err);
            resolve(JSON.parse(body).objects)
        })
    })
}

function createRequestParams(options: NpmSearchParams): UriOptions & CoreOptions { // UriOptions & CoreOptions from @types/request package
    const searchParams = new URLSearchParams();

    if (options.name)/*-----*/searchParams.set('q', options.name);
    if (options.keywords)/*-*/searchParams.set('q', 'keywords:' + options.keywords.join(' '));
    if (options.ranking)/*--*/searchParams.set('ranking', options.ranking);

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