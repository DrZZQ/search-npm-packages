export declare type NpmRegistryPackage = {
    name: string;
    scope: string;
    version: string;
    description: string;
    keywords: string[];
    date: {
        ts: number;
        rel: string;
    };
    links: {
        npm: string;
        homepage?: string;
        repository?: string;
        bugs?: string;
    };
    author?: {
        name: string;
        email: string;
        useaname: string;
    };
    publisher: {
        name: string;
        avatars: {
            small: string;
            medium: string;
            large: string;
        };
        created: {
            ts: number | null;
            rel: string;
        };
        email: string;
    };
    maintainers: Array<{
        username: string;
        email: string;
    }>;
    keywordsTruncated: boolean;
};
export declare type NpmSearchResult = {
    formData: {
        search: {
            q: {
                value: string;
            };
        };
    };
    objects: Array<{
        package: NpmRegistryPackage;
        score: {
            final: number;
            detail: {
                quality: number;
                popularity: number;
                maintenance: number;
            };
        };
        "searchScore": number;
    }>;
    total: number;
    time: string;
    pagination: {
        perPage: number;
        page: number;
    };
    url: string;
    user: null;
    csrftoken: string;
    notifications: [];
    npmExpansions: string[];
    isNpme: false;
};
export declare type NpmSearchParams = {
    name?: string;
    keywords?: string[];
    ranking?: 'optimal' | 'maintenance' | 'popularity' | 'quality';
    quantity?: number;
};
