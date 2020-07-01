import React, { Component, ChangeEvent } from "react";
import "react-sortable-tree/style.css"; // This only needs to be imported once in your app
import { Input } from "semantic-ui-react";
import { TreeItem } from "react-sortable-tree";

interface IProps {
  node: TreeItem;
  path: (number | string)[];
  onFieldChanged: (
    event: ChangeEvent,
    node: TreeItem,
    path: (number | string)[],
    field: string
  ) => void;
}

export default class TreeNodeContent extends Component<IProps, any> {
  constructor(props?: any) {
    super(props);
  }

  render() {
    const { node, path, onFieldChanged } = this.props;

    return (
      <div style={{ alignItems: "center" }}>
        <Input
          label="Name"
          placeholder="New name..."
          value={node.localityName}
          onChange={(event) => {
            onFieldChanged(event, node, path, "localityName");
          }}
        />
        <br />
        <Input
          label="Category"
          list="categories"
          placeholder="Choose category..."
          value={node.category}
          onChange={(event) => {
            onFieldChanged(event, node, path, "category");
          }}
        />
        <datalist id="categories">
          <option value="" />
          <option value="С" />
          <option value="Щ" />
          <option value="Т" />
          <option value="М" />
          <option value="Р" />
        </datalist>
      </div>
    );
  }
}
