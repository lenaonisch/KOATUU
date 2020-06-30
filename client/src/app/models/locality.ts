export interface ILocality {
    id: string;
    localityName: string;
    category: string;
    expanded? : boolean;
    children? : ILocality[];
    parentId? : string;
}