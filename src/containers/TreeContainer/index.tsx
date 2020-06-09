import React from "react";
import Slide from "../../components/Slide";
import {connect} from "react-redux";
import {updateShown} from "../../redux/actions";
import TreeCanvas from "../TreeCanvas";

class TreeContainer extends React.Component<any, any> {
    render() {
        return (
            // @ts-ignore
            <Slide direction={"right"} offset={1} shown={this.props.shown} closeFunc={this.props.updateShown}>
                <TreeCanvas />
            </Slide>
        );
    }
}



const mapStateToProps = (state: any) => {
    const { tree } = state;
    const { shown, treeData } = tree;
    return { shown, treeData };
};

export default connect(mapStateToProps, {updateShown})(TreeContainer);