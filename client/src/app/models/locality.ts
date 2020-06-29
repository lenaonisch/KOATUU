export interface ILocality {
    id: number;
    title: string;
    category: string;
    expanded? : boolean;
    children? : ILocality[];
    parentId? : number;
}