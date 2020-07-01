import React, { Component, ChangeEvent } from "react";
import "react-sortable-tree/style.css"; // This only needs to be imported once in your app
import { Button, Icon, Input, Popup } from "semantic-ui-react";
import { TreeItem } from "react-sortable-tree";

interface IProps {
  node: TreeItem;
  path: (number | string)[];
  onAddNode: (node: TreeItem, path: (number | string)[]) => void;
  onRemoveNode: (node: TreeItem, path: (number | string)[]) => void;
  onSaveNode: (node: TreeItem, path: (number | string)[]) => void;
}

export default class TreeNodeButtons extends Component<IProps, any> {
  constructor(props?: any) {
    super(props);
  }

  render() {
    const { node, path, onAddNode, onRemoveNode, onSaveNode } = this.props;

    return (
      <Button.Group>
        <Popup pinned on="click" trigger={<Button>...</Button>}>
          <Popup.Content>
            <Input label="Id" size="mini" value={node.id} readOnly={true} />
          </Popup.Content>
        </Popup>

        <Button positive onClick={() => onSaveNode(node, path)}>
          <Icon name="save" />
        </Button>
        <Button
          disabled={path.length > 3}
          color="blue"
          onClick={() => onAddNode(node, path)}
        >
          +<Icon name="level down" />
        </Button>
        <Button negative onClick={() => onRemoveNode(node, path)}>
          <Icon name="remove" />
        </Button>
      </Button.Group>
    );
  }
}
