import { TreeItem } from "react-sortable-tree";

export interface ILocality extends TreeItem {
    id: number;
    title: string;
    expanded : boolean;
    category: string;
    children : ILocality[];
}