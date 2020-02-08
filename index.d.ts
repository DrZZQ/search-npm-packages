export declare type RegistryPackage = {
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
export declare type NpmSearchParams = {
    name?: string;
    keywords?: string[];
    ranking?: 'optimal' | 'maintenance' | 'popularity' | 'quality';
};
export default function npmSearch(search: NpmSearchParams): Promise<RegistryPackage[]>;
