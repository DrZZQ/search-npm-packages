export type NpmSearchParams = {
    name?: string
    keywords: string[]
    ranking:  'optimal' |
        'maintenance' |
        'popularity' |
        'quality'
}

export default function npmSearch(search: NpmSearchParams): Promise<object> {
    return new Promise((resolve, reject) => {

    })
}