import React from "react";
import Slide from "../../components/Slide";
import {connect} from "react-redux";
import {updateShown} from "../../redux/actions";
import TreeCanvas from "../TreeCanvas";
import { clickTopic,clickTopicName,fetchTreeData,updateTreeData } from "../../redux/actions";
// @ts-ignore
import { gaozhongshuxue } from '../../module/topicDependenceVisualization';
import {Button,Menu} from 'antd';
import 'antd/dist/antd.css';
import './index.css';
const { SubMenu } = Menu;

class TreeContainer extends React.Component<any, any> {
    rootSubmenuKeys = ['sub1','sub2'];

    state = {
      openKeys:['']
    };
    
  
    onOpenChange = openKeys => {
      const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.setState({ openKeys });
      } else {
        this.setState({
          openKeys: latestOpenKey ? [latestOpenKey] : [],
        });
      }
    };
    render() {
        const { inTopic, outTopic, mapData} = this.props;
        
        return (
            // @ts-ignore
            <Slide direction={"right"} offset={1} shown={this.props.shown} closeFunc={this.props.updateShown}>
               <div className="about-backgroundImage" style={{ position: "absolute", top:30,width:"100%"}}>
                 {
                   mapData.topics===undefined?(
                   null
                   ):
                   <Menu
                    mode="horizontal"
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                    style={{borderStyle:"solid",textAlign:"center"}}
                >
                    <SubMenu key="sub1" title="先序知识点" >
                        {inTopic.map((topicId: any) =>
                        <Menu.Item style={{ margin:10}} key={topicId} onClick={()=>
                            {this.props.clickTopic(topicId);
                            this.props.clickTopicName(mapData.topics[topicId]);
                            this.props.fetchTreeData(mapData.topics[topicId]);
                            this.props.updateTreeData();}}>
                            {mapData.topics[topicId]}
                        </Menu.Item>)}
                    </SubMenu>
                    <SubMenu key="sub2" title="后序知识点" >
                    {outTopic.length==0?<Menu.Item disabled>无后序知识点</Menu.Item>:outTopic.map((topicId: any) => <Menu.Item style={{ margin:10}} 
                       key={topicId} onClick={()=>{this.props.clickTopic(topicId);
                           this.props.clickTopicName(mapData.topics[topicId]);
                           this.props.fetchTreeData(mapData.topics[topicId]);
                           this.props.updateTreeData();}}>{mapData.topics[topicId]}
                           </Menu.Item>)}
                    </SubMenu>

                </Menu>
                 }
                    
                </div>
                <TreeCanvas />
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