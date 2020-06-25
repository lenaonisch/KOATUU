
import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
import { ILocality } from '../../app/models/locality';
import agents from "../../app/api/agents";


export default class Tree extends Component<{}, any> {
  constructor(props?: any) {
    super(props);
    this.state = {treeData: []};    
  }
componentDidMount(){
  this.setState(() => {
    agents.Localities.list().then((response) => {
      this.setState({
        treeData: response
      })
    });
  }
)
}
  
  render() {
    
    return (
      <div style={{ height: 400 }}>
        <SortableTree
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })}
        />
      </div>
    );
  }
}