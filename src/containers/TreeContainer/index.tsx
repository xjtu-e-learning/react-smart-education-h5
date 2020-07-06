import React from "react";
import Slide from "../../components/Slide";
import {connect} from "react-redux";
import {updateShown} from "../../redux/actions";
import TreeCanvas from "../TreeCanvas";
import { clickTopic,clickTopicName,fetchTreeData,updateTreeData } from "../../redux/actions";
// @ts-ignore
import { gaozhongshuxue } from '../../module/topicDependenceVisualization';

class TreeContainer extends React.Component<any, any> {
    render() {
        const { inTopic, outTopic, mapData} = this.props;
        return (
            // @ts-ignore
            <Slide direction={"right"} offset={1} shown={this.props.shown} closeFunc={this.props.updateShown}>
               <div style={{ position: "absolute", top:60}}>
                {
                    inTopic.map((topicId: any) => <button style={{ margin:10}} key={topicId} onClick={()=>{this.props.clickTopic(topicId);this.props.clickTopicName(gaozhongshuxue.topics[topicId]);
                        this.props.fetchTreeData(gaozhongshuxue.topics[topicId]);
                       
                        this.props.updateTreeData();
                    }}>{mapData.topics[topicId]}</button>)
                }
                </div>
                <TreeCanvas />
                <div  style={{ position: "absolute", bottom: 20  }}>
                {
                    outTopic.map((topicId: any) => <button style={{ margin:10}} key={topicId} onClick={()=>{this.props.clickTopic(topicId);this.props.clickTopicName(gaozhongshuxue.topics[topicId]);
                        this.props.fetchTreeData(gaozhongshuxue.topics[topicId]);
                        this.props.updateTreeData();}}>{mapData.topics[topicId]}</button>)
                }
                </div>
            </Slide>
        );
    }
}


const mapStateToProps = (state: any) => {
    const { tree,community } = state;
    const { shown, treeData } = tree;
    const {mapData, inTopic, outTopic} = community;
    return { shown, treeData,mapData, inTopic, outTopic};
};

export default connect(mapStateToProps, {updateShown,clickTopic,clickTopicName,fetchTreeData,updateTreeData})(TreeContainer);