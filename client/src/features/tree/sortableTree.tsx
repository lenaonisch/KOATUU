import React, { Component } from "react";
import SortableTree, {
  SearchData,
  addNodeUnderParent,
  removeNodeAtPath,
  changeNodeAtPath,
  find,
} from "react-sortable-tree";
import "react-sortable-tree/style.css"; // This only needs to be imported once in your app
import { ILocality } from "../../app/models/locality";
import agents from "../../app/api/agents";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Button, Icon, Input, Popup } from "semantic-ui-react";
import TreeHeader from "./treeHeader";

export default class Tree extends Component<{}, any> {
  constructor(props?: any) {
    super(props);
    this.state = {
      searchString: "",
      searchFoundCount: 0,
      searchFocusIndex: 0,
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
      searchFoundCount,
      searchFocusIndex
    } = this.state;

    const getNodeKey = ({ treeIndex }) => treeIndex;
 
    const getNewLocalityId = (level: number, parentId: number, lastChildId: number) => {
      var multiplier = 0;
      switch (level){
        case 1:
          multiplier = 100000000;
          break;
        case 2:
          multiplier = 100000;
          break;
        case 3:
          multiplier = 100;
          break;
        case 4:
          multiplier = 1;
          break;
      }
      var newId = lastChildId == 0? parentId + multiplier: lastChildId + multiplier;
      var leadingZero = (newId.toString().length < 10) ? '0' : '';

      return leadingZero + newId
    }
    // Case insensitive search of `node.title`
    const customSearchMethod = ({ node, searchQuery }: SearchData) => {
      return (
        searchQuery && (
        (node.category != null && node.category 
          .toString()
          .toLowerCase()
          .indexOf(searchQuery.toLowerCase()) > -1) ||
        node.localityName
          .toString()
          .toLowerCase()
          .indexOf(searchQuery.toLowerCase()) > -1)
      );
    };

    const onSearchChange = (event) => {
      this.setState({
        searchMatches: find({
          getNodeKey,
          treeData: this.state.treeData,
          searchQuery: event.target.value,
          searchMethod: customSearchMethod,
          searchFocusOffset: 0,
          expandAllMatchPaths: true,
        }).matches,
        searchString: event.target.value,
      });
    }

    const addNode = () =>
      this.setState((state) => ({
        treeData: state.treeData.concat({
          id: getNewLocalityId(
            1,
            0,
            Number(this.state.treeData[this.state.treeData.length - 1].id)
          ),
          isNewNode: true,
          parentId: null,
        }),
      }))

    const getMatchedIndexes = () => { 
      return this.state.searchMatches.map((item) => item.node.id);
    }

    return (
      
      <div >
        <TreeHeader
          searchFocusIndex={searchFocusIndex}
          searchFoundCount={searchFoundCount}
          onSearchChange={onSearchChange}
          addNode={addNode}
          getMatchedIndexes={getMatchedIndexes}
        />

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
                  <Input 
                    label='Name'
                    placeholder='New name...'
                    value={node.localityName}
                    onChange={(event) => {
                      const value = event.target.value;
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
                  <br/>
                  <Input 
                    label='Category'
                    list='categories'
                    placeholder='Choose category...'
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
                    <datalist id='categories'>
                      <option value='' />
                      <option value='С' />
                      <option value='Щ' />
                      <option value='Т' />
                      <option value='М' />
                      <option value='Р' />
                    </datalist>
                </div>
              ),

              buttons: [
                <Button.Group>
                  <Popup
                    pinned
                    on='click'
                    trigger={<Button>...</Button>}>
                    <Popup.Content>
                      <Input 
                        label='Id' 
                        size='mini'
                        value={node.id} 
                        readOnly={true}
                      />
                    </Popup.Content>
                  </Popup>
                    
                  <Button
                  positive
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
                         }));
                      });
                    }
                    
                  }}
                  >
                    <Icon name='save'/>
                  </Button>
                  <Button
                  disabled= {(path.length > 3)}
                  color='blue'
                  onClick={() => {
                    let lastChildId = node.children.length == 0? 0: node.children[node.children.length-1].id;
                    let newLocalityId = getNewLocalityId(path.length + 1, Number(node.id), Number(lastChildId));
                    this.setState((state) => ({
                      treeData: addNodeUnderParent({
                        treeData: state.treeData,
                        parentKey: path[path.length - 1],
                        expandParent: true,
                        getNodeKey,
                        newNode: {
                          localityName: "",
                          category: "",
                          id: newLocalityId,
                          parentId: node.id,
                          isNewNode:true
                        },
                        addAsFirstChild: state.addAsFirstChild,
                      }).treeData,
                    }));
                  }}
                  >
                    +<Icon name='level down'/>
                  </Button>
                  <Button
                  negative
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
                    <Icon name='remove'/>
                  </Button>
                </Button.Group>
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
      </div>
    );
  }
}
