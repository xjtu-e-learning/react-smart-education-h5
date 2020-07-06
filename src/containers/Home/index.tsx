import React from "react";
import MapCanvas from "../MapCanvas";
import { connect } from "react-redux";

import { clickCom } from "../../redux/actions";
import {Button} from 'antd';

class Home extends React.Component<any, any> {

    render() {
        const { inCom, outCom, mapData, sequences} = this.props;
        return (
            <div style={{ height: '100vh', overflow: 'hidden' }}>
                <div style={{ position: "absolute", top: 60}}>
                {
                    inCom.map((comId: any) => <Button style={{ margin:10}} type="primary" shape="circle" key={comId} onClick={()=>this.props.clickCom(comId)}>{mapData.topics[sequences[comId][0]]}</Button>)
                }
                </div>
                <MapCanvas />
                <div  style={{ position: "absolute", bottom: 20, margin:10, color:'blue'  }}>
                {
                    outCom.map((comId: any) => <Button style={{ margin:10}} key={comId} onClick={()=>this.props.clickCom(comId)}>{mapData.topics[sequences[comId][0]]}</Button>)
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