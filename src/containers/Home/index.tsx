import React from "react";
import MapCanvas from "../MapCanvas";
import { connect } from "react-redux";

import { clickCom } from "../../redux/actions";

class Home extends React.Component<any, any> {

    render() {
        const { inCom, outCom, mapData, sequences} = this.props;
        return (
            <div style={{ height: '100vh', overflow: 'hidden' }}>
                <div style={{ position: "absolute", top: 40 }}>
                {
                    inCom.map((comId: any) => <button key={comId} onClick={()=>this.props.clickCom(comId)}>{mapData.topics[sequences[comId][0]]}</button>)
                }
                </div>
                <MapCanvas />
                <div  style={{ position: "absolute", bottom: 40 }}>
                {
                    outCom.map((comId: any) => <button key={comId} onClick={()=>this.props.clickCom(comId)}>{mapData.topics[sequences[comId][0]]}</button>)
                }
                </div>
            </div>
        );
    }

}

function mapStateToProps(state: any) {
    const { community } = state;
    const { mapData, inCom, outCom, sequences } = community;
    return {
        mapData, inCom, outCom, sequences,
    };
}

export default connect(mapStateToProps, {clickCom})(Home);