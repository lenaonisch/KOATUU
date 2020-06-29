export interface ILocality {
    id: number;
    localityName: string;
    category: string;
    expanded? : boolean;
    children? : ILocality[];
    parentId? : number;
}