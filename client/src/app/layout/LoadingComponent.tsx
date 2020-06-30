import { Component } from "react";
import { Loader, Dimmer } from "semantic-ui-react";
import React from "react";

export default class LoadingComponent extends Component<{content?:string}, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Dimmer active inverted={true}>
                <Loader content={this.props.content}></Loader>
            </Dimmer>
        )
    }
}