import { NpmSearchParams, NpmRegistryPackage } from "./types";
export default function npmSearch(search: NpmSearchParams): Promise<NpmRegistryPackage[]>;
