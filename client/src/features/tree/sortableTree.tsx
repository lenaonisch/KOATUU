import React, { Component } from "react";
import SortableTree, {
  SearchData,
  defaultSearchMethod,
  addNodeUnderParent,
  removeNodeAtPath,
  changeNodeAtPath,
  find,
} from "react-sortable-tree";
import "react-sortable-tree/style.css"; // This only needs to be imported once in your app
import { ILocality } from "../../app/models/locality";
import agents from "../../app/api/agents";
import LoadingComponent from "../../app/layout/LoadingComponent";

export default class Tree extends Component<{}, any> {
  constructor(props?: any) {
    super(props);
    this.state = {
      searchString: "",
      searchFocusIndex: 0,
      searchFoundCount: null,
      treeData: [],
      searchMatches:[]
    };
  }

  componentDidMount() {
    if (this.state.treeData.length == 0) {
      agents.Localities.list().then((response) => {
        this.setState({
          treeData: response,
        });
      }).then(()=>
        this.setState({
          loading: false,
        })
      );
    }
  }
  
  render() {
    const {
      searchString,
      searchFocusIndex,
      searchFoundCount,
    } = this.state;

    const getNodeKey = ({ treeIndex }) => treeIndex;

    // Case insensitive search of `node.title`
    const customSearchMethod = ({ node, searchQuery }: SearchData) => {
      return (
        searchQuery &&
        node.localityName
          .toString()
          .toLowerCase()
          .indexOf(searchQuery.toLowerCase()) > -1
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
            onChange={(event) => {
              this.setState({ 
                searchMatches:
                  find({
                    getNodeKey,
                    treeData: this.state.treeData,
                    searchQuery: event.target.value,
                    searchMethod: customSearchMethod,
                    searchFocusOffset: 0,
                    expandAllMatchPaths: true
                  }).matches, 
                searchString: event.target.value,
              })
            }}
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

        <div style={{ height: '85vh' }}>
          <SortableTree
            treeData={this.state.treeData}
            onChange={(treeData) => this.setState({ treeData })}
            rowHeight={100}
            placeholderRenderer={ ()=>
              <LoadingComponent content={'Loading...'}/>
            }  
      
            generateNodeProps={({ node, path }) => ({
              title: (
                <div style={{ alignItems: "center" }}>
                  <label style={{ marginTop: "1em" }}>
                    Name:
                    <input
                      style={{ fontSize: "1.1rem" }}
                      value={node.localityName}
                      onChange={(event) => {
                        const value = event.target.value;
                        console.log(node);
                        this.setState((state) => ({
                          treeData: changeNodeAtPath({
                            treeData: state.treeData,
                            path,
                            getNodeKey,
                            newNode: { ...node, localityName: value },
                          }),
                        }));
                      }}
                    />
                  </label>
                  <br />

                  <label style={{ marginTop: "1em" }}>
                    Id:
                    <input 
                      style={{ fontSize: "1em" }} 
                      value={node.id} 
                      onChange={(event) => {
                        const value = event.target.value;

                        this.setState((state) => ({
                          treeData: changeNodeAtPath({
                            treeData: state.treeData,
                            path,
                            getNodeKey,
                            newNode: { ...node, id: value },
                          }),
                        }));
                      }}
                    />
                  </label>
                  <br />
                  <label style={{ marginTop: "1em" }}>
                    Category:
                    <input
                      style={{ fontSize: "1em" }}
                      value={node.category}
                      onChange={(event) => {
                        const value = event.target.value;

                        this.setState((state) => ({
                          treeData: changeNodeAtPath({
                            treeData: state.treeData,
                            path,
                            getNodeKey,
                            newNode: { ...node, category: value },
                          }),
                        }));
                      }}
                    />
                  </label>
                </div>
              ),

              buttons: [
                <button
                  onClick={() => {
                    let locality: ILocality = {
                      id: node.id,
                      localityName: node.localityName,
                      category: node.category,
                    };

                    if (node.isNewNode == true) {
                      locality.parentId = node.parentId;
                      
                      agents.Localities.add(locality).then(() => {
                        this.setState((state) => ({
                          treeData: changeNodeAtPath({
                            treeData: state.treeData,
                            path: path,
                            getNodeKey,
                            newNode: { ...node, isNewNode: false },
                          }),
                        }));
                      });
                    } else {
                      locality.parentId = this.state.treeData[path[path.length - 1]].parentId;
                      agents.Localities.edit(locality).then(() => {
                        this.setState((state) => ({
                          treeData: changeNodeAtPath({
                            treeData: state.treeData,
                            path: path,
                            getNodeKey,
                            newNode: {
                            },
                          }),
                        }));
                      });
                    }
                  }}
                >
                  Save
                </button>,
                <button
                  onClick={() => {
                    this.setState((state) => ({
                      treeData: addNodeUnderParent({
                        treeData: state.treeData,
                        parentKey: path[path.length - 1],
                        expandParent: true,
                        getNodeKey,
                        newNode: {
                          localityName: "",
                          category: "",
                          id: null,
                          parentId: this.state.treeData[path[path.length - 1]].id,
                          isNewNode:true
                        },
                        addAsFirstChild: state.addAsFirstChild,
                      }).treeData,
                    }));
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
        <div  style={{ height: '5vh' }}>
        <button
          style={{ marginTop: "1em" }}
          onClick={() =>
            this.setState((state) => ({
              treeData: state.treeData.concat({
                title: state.newName,
                isNewNode: true,
                parentId: null
              }),
            }))
          }
        >
          Add more
        </button>
        <button
          style={{ marginTop: "1em" , marginLeft: "2em"}}
          onClick={() =>
            agents.Localities.file(
              this.state.searchMatches.map(item => item.node.id)).then((response) => {
                var fileDownload = require('js-file-download');
                fileDownload(response, 'filename.pdf');
              })
            }
        >
          Export
        </button>
        </div>
      </div>
    );
  }
}
