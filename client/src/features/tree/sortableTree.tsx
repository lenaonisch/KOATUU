import React, { Component } from "react";
import SortableTree, {
  SearchData,
  defaultSearchMethod,
  addNodeUnderParent,
  removeNodeAtPath,
  changeNodeAtPath,
} from "react-sortable-tree";
import "react-sortable-tree/style.css"; // This only needs to be imported once in your app
import { ILocality } from "../../app/models/locality";
import agents from "../../app/api/agents";

export default class Tree extends Component<{}, any> {
  constructor(props?: any) {
    super(props);
    this.state = {
      newId: 0,
      newName: "",
      searchString: "",
      searchFocusIndex: 0,
      searchFoundCount: null,
      treeData: [],
    };
  }

  componentDidMount() {
    if (this.state.treeData.length == 0) {
      agents.Localities.list().then((response) => {
        this.setState({
          treeData: response,
        });
      });
    }
  }

  render() {
    const {
      newId,
      newName,
      newCategory,
      searchString,
      searchFocusIndex,
      searchFoundCount,
    } = this.state;

    const getNodeKey = ({ treeIndex }) => treeIndex;

    // Case insensitive search of `node.title`
    const customSearchMethod = ({ node, searchQuery }: SearchData) => {
      return (
        searchQuery &&
        node.title.toString().toLowerCase().indexOf(searchQuery.toLowerCase()) >
          -1
      );
    };

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
      <div>
        <label style={{ marginTop: "1em" }}>
          Новый Id:
          <input
            id="new-id"
            type="text"
            placeholder="new id..."
            style={{ fontSize: "1rem", marginTop: "1em", marginLeft: "10px" }}
            value={newId}
            onChange={(event) => this.setState({ newId: event.target.value })}
          />
        </label>
        <label style={{ marginTop: "1em" }}>
          Новое имя:
          <input
            id="new-locality"
            type="text"
            placeholder="new locality..."
            style={{ fontSize: "1rem", marginTop: "1em", marginLeft: "10px" }}
            value={newName}
            onChange={(event) => this.setState({ newName: event.target.value })}
          />
        </label>
        <label style={{ marginTop: "1em" }}>
          Категория:
          <input
            id="new-category"
            type="text"
            placeholder="new category..."
            style={{ fontSize: "1rem", marginTop: "1em", marginLeft: "10px" }}
            value={newCategory}
            onChange={(event) => this.setState({ newCategory: event.target.value })}
          />
        </label>
        <br />
        <form
          style={{ display: "inline-block", marginTop: "1em" }}
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <input
            id="find-box"
            type="text"
            placeholder="Search..."
            style={{ fontSize: "1rem" }}
            value={searchString}
            onChange={(event) =>
              this.setState({ searchString: event.target.value })
            }
          />

          <button
            type="button"
            disabled={!searchFoundCount}
            onClick={selectPrevMatch}
          >
            &lt;
          </button>

          <button
            type="submit"
            disabled={!searchFoundCount}
            onClick={selectNextMatch}
          >
            &gt;
          </button>

          <span>
            &nbsp;
            {searchFoundCount > 0 ? searchFocusIndex + 1 : 0}
            &nbsp;/&nbsp;
            {searchFoundCount || 0}
          </span>
        </form>

        <div style={{ height: 400 }}>
          <SortableTree
            treeData={this.state.treeData}
            onChange={(treeData) => this.setState({ treeData })}
            generateNodeProps={({ node, path }) => ({
              
              title: (
                <div>
                <input
                  style={{ fontSize: '1.1rem' }}
                  value={node.title.toString()}
                  onChange={event => {
                    const value = event.target.value;

                    this.setState(state => ({
                      treeData: changeNodeAtPath({
                        treeData: state.treeData,
                        path,
                        getNodeKey,
                        newNode: { ...node, title:value },
                      }),
                    }));
                  }}
                />
                <br/>
                </div>
              ),
              subtitle: (                 
                <input
                  style={{ fontSize: '1em' }}
                  value={node.category}
                  onChange={event => {
                    const value = event.target.value;
                    
                    this.setState(state => ({
                      treeData: changeNodeAtPath({
                        treeData: state.treeData,
                        path,
                        getNodeKey,
                        newNode: { ...node, category: value },
                      }),
                    }));
                  }}
                />
              ),
              buttons: [
                <button
                  onClick={() => {
                    let locality: ILocality = {
                      id: node.id,
                      title: "",
                      category: node.category,
                      parentId: this.state.treeData[path[path.length - 1]].id,
                    };

                    agents.Localities.edit(locality).then(() => {
                      this.setState((state) => ({
                        treeData: addNodeUnderParent({
                          treeData: state.treeData,
                          parentKey: path[path.length - 1],
                          expandParent: true,
                          getNodeKey,
                          newNode: {
                            title: state.title,
                          },
                          addAsFirstChild: state.addAsFirstChild,
                        }).treeData,
                      }));
                    });
                  }}
                >
                  Save
                </button>,
                <button
                  onClick={() => {
                    let locality: ILocality = {
                      id: this.state.newId,
                      title: this.state.newName,
                      category: newCategory,
                      parentId: this.state.treeData[path[path.length - 1]].id,
                    };

                    agents.Localities.add(locality).then(() => {
                      this.setState((state) => ({
                        treeData: addNodeUnderParent({
                          treeData: state.treeData,
                          parentKey: path[path.length - 1],
                          expandParent: true,
                          getNodeKey,
                          newNode: {
                            title: state.newName,
                          },
                          addAsFirstChild: state.addAsFirstChild,
                        }).treeData,
                      }));
                    });
                  }}
                >
                  Add Child
                </button>,
                <button
                  onClick={() => {
                    let id = node.id;
                    agents.Localities.delete(id).then(() => {
                      this.setState((state) => ({
                        treeData: removeNodeAtPath({
                          treeData: state.treeData,
                          path,
                          getNodeKey,
                        }),
                      }));
                    });
                  }}
                >
                  Remove
                </button>,
              ],
            })}
            //
            // Custom comparison for matching during search.
            // This is optional, and defaults to a case sensitive search of
            // the title and subtitle values.
            // see `defaultSearchMethod` in https://github.com/frontend-collective/react-sortable-tree/blob/master/src/utils/default-handlers.js
            searchMethod={customSearchMethod}
            //
            // The query string used in the search. This is required for searching.
            searchQuery={searchString}
            //
            // When matches are found, this property lets you highlight a specific
            // match and scroll to it. This is optional.
            searchFocusOffset={searchFocusIndex}
            //
            // This callback returns the matches from the search,
            // including their `node`s, `treeIndex`es, and `path`s
            // Here I just use it to note how many matches were found.
            // This is optional, but without it, the only thing searches
            // do natively is outline the matching nodes.
            searchFinishCallback={(matches) =>
              this.setState({
                searchFoundCount: matches.length,
                searchFocusIndex:
                  matches.length > 0 ? searchFocusIndex % matches.length : 0,
              })
            }
          />
        </div>

        <button
          style={{ marginTop: "1em" }}
          onClick={() =>
            this.setState((state) => ({
              treeData: state.treeData.concat({
                title: state.newName,
              }),
            }))
          }
        >
          Add more
        </button>
        <br />
        {/* <label htmlFor="addAsFirstChild">
          Add new nodes at start
          <input
            name="addAsFirstChild"
            type="checkbox"
            checked={this.state.addAsFirstChild}
            onChange={() =>
              this.setState(state => ({
                addAsFirstChild: !state.addAsFirstChild,
              }))
            }
          />
        </label> */}
      </div>
    );
  }
}
