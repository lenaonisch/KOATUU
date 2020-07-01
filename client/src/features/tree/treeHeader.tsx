import React, { Component, ChangeEvent } from "react";
import "react-sortable-tree/style.css"; // This only needs to be imported once in your app
import agents from "../../app/api/agents";
import { Button, Icon, Input } from "semantic-ui-react";

interface IProps {
    onSearchChange: (event: ChangeEvent)=> void ;
    searchFocusIndex: number;
    searchFoundCount: number;
    addNode: () => void;
    getMatchedIndexes: () => string[];
}

export default class TreeHeader extends Component<IProps, any> {
  constructor(props?: any) {
    super(props);
    this.state = {
        searchFoundCount: null,
    }
  }

  render() {

    const {searchFocusIndex, searchFoundCount, onSearchChange, addNode, getMatchedIndexes} = this.props;
    const {
        searchString
      } = this.state;
    
    const selectPrevMatch = () =>
      this.setState({  
        searchFocusIndex:
          searchFocusIndex !== null
            ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
            : searchFoundCount - 1,
      });

    const selectNextMatch = () =>
      this.setState({
        searchFocusIndex:
          searchFocusIndex !== null
            ? (searchFocusIndex + 1) % searchFoundCount
            : 0,
    });
      
    return (
      <div className="header">
        <Button
          icon="add"
          color="blue"
          onClick={addNode}
        />

        <form
          style={{ display: "inline-block", marginLeft: "4em" }}
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <Input
            id="find-box"
            type="text"
            placeholder="Search..."
            value={searchString}
            onChange={onSearchChange}
          />
          <Button.Group style={{ marginLeft: "2px" }}>
            <Button
              type="button"
              icon="left arrow"
              disabled={!searchFoundCount}
              onClick={selectPrevMatch}
            />

            <Button
              type="submit"
              icon="right arrow"
              disabled={!searchFoundCount}
              onClick={selectNextMatch}
            />
          </Button.Group>
          <span>
            &nbsp;
            {searchFoundCount > 0 ? searchFocusIndex + 1 : 0}
            &nbsp;/&nbsp;
            {searchFoundCount || 0}
          </span>

          <Button
            style={{ marginTop: "1em", marginLeft: "2em" }}
            onClick={() =>
              agents.Localities.file(
                getMatchedIndexes()
              ).then((response) => {
                var fileDownload = require("js-file-download");
                fileDownload(response, "filename.pdf");
              })
            }
          >
            Export
          </Button>
        </form>
      </div>
    );
  }
}
