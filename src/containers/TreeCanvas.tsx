import React from 'react';
import {isEmpty, isEqual} from "lodash";
import {connect} from "react-redux";
// @ts-ignore
import { drawTree } from '../module/facetTree';
import {fetchAssembleData, updateAssembleShown} from "../redux/actions";

class TreeCanvas extends React.Component<any, any> {
    render() {
        console.log(this.props.treeData);
        return (
            <svg id={"tree"} width={"100vw"} height={"120vw"} style={{position: "relative", top: "50%", marginTop: "-50vw"}}>
            </svg>
        );
    }
    componentDidMount() {
        if (isEmpty(this.props.treeData)) return;
        const tree = document.getElementById('tree');
        emptyChildren(tree);
        drawTree(tree, this.props.treeData, (d:any) => {
            this.props.fetchAssembleData(d);
            this.props.updateAssembleShown();
        });
    }

}

function emptyChildren(dom: HTMLElement | null): void {
    if (!dom) return;
    const children = dom.childNodes;
    while (children.length > 0) {
        dom.removeChild(children[0]);
    }
}

const mapStateToProps = (state: any) => {
    const { tree } = state;
    const { treeData } = tree;
    return { treeData };
};

export default connect(mapStateToProps, {fetchAssembleData, updateAssembleShown})(TreeCanvas);