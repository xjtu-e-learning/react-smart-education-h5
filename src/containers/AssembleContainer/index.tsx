import React from "react";
import Slide from "../../components/Slide";
import {connect} from "react-redux";
import {updateAssembleShown} from "../../redux/actions";

class AssembleContainer extends React.Component<any, any> {
    render() {
        const { assembleData, assembleShown, updateAssembleShown } = this.props;
        return (
            <Slide direction={"bottom"} offset={0.5} shown={assembleShown} closeFunc={updateAssembleShown}>
                {
                    assembleData && assembleData.map((assemble: any) => (
                        <div key={assemble.assembleId} dangerouslySetInnerHTML={{__html: assemble.assembleContent}}>
                        </div>
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