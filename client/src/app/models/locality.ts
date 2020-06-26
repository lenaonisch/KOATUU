export interface ILocality {
    id: number;
    title: string;
    expanded : boolean;
    children : ILocality[];
}