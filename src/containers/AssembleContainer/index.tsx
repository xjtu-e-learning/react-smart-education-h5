import React from "react";
import Slide from "../../components/Slide";
import {connect} from "react-redux";
import {updateAssembleShown} from "../../redux/actions";
import Assemble from "./assemble";


class AssembleContainer extends React.Component<any, any> {
    render() {
        console.log("assemble的index页面",this.props);
        const { assembleData, assembleShown, updateAssembleShown } = this.props;
        return (
            <Slide direction={"bottom"} offset={0.5} shown={assembleShown} closeFunc={updateAssembleShown}>
                {
                    assembleData && assembleData.map((assemble: {assembleId:number;assembleContent:string;assembleScratchTime:string;facetId:number;domainId:number;type:string;}) => (
                        <Assemble assemble={assemble} key={assemble.assembleId} />
                    ))
                }

            </Slide>
        );
    }
}

function mapStateToProps(state: any) {
    const { tree } = state;
    const { assembleData, assembleShown } = tree;
    return { assembleData, assembleShown};
}

export default connect(mapStateToProps, {updateAssembleShown})(AssembleContainer);