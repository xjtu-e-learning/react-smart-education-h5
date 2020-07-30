import React from "react";
import MapCanvas from "../MapCanvas";
import { connect } from "react-redux";

import { clickCom, fetchSubjectData, updateSubjectData ,fetchDomainData, updateDomainData ,updateMapShown} from "../../redux/actions";
import {Menu,Typography} from 'antd';
import {AppstoreOutlined} from '@ant-design/icons'


import 'antd/dist/antd.css';

import './index.css'
import Slide from "../../components/Slide";
const Title=Typography.Title;
const { SubMenu } = Menu;
class Home extends React.Component<any, any> {
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
        const { inCom, outCom, mapData, sequences,comId,mapShown,updateMapShown} = this.props;

        if(comId===-1)
            {return (   
              <Slide direction={"right"} offset={1} shown={mapShown} closeFunc={updateMapShown}>        
              <div    style={ { height: '100vh', overflow: 'hidden' }}>
                    
                  {/* <div className="title" style={{ position: "absolute", top: 30,width:"100%",height:40,padding:0}}>                     
                      <Title level={3}
                      style={{textAlign:"center",padding:0}}
                      >
                      <AppstoreOutlined /> 学科： 高中数学
                    </Title>
                  </div> */}
                  <MapCanvas />
                  
              </div>
              </Slide>
          );}else{return (       
            <Slide direction={"right"} offset={1} shown={mapShown} closeFunc={updateMapShown}>
                <div style={{ height: '100vh', overflow: 'hidden' }}>
                    <div style={{ position: "absolute", top: 30,width:"100%",height:60}}>                     
                        <Menu
                        mode="horizontal"
                        openKeys={this.state.openKeys}
                        onOpenChange={this.onOpenChange}
                        style={{borderStyle:"solid",textAlign:"center"}}
                        >
                          
                            <SubMenu key="sub1" title="先序知识簇" >
                                {inCom.length==0?<Menu.Item disabled>无先序知识簇</Menu.Item>:inCom.map((comId: any) => 
                                <Menu.Item style={{ margin:10}}  key={comId} 
                                onClick={()=>{this.props.clickCom(comId);
                                this.setState({openKeys:[],})}}>
                                  {mapData.topics[sequences[comId][0]]}
                                </Menu.Item>)}
                            </SubMenu>
                            
                            <SubMenu key="sub2" title="后序知识簇" >
                                {outCom.length==0?<Menu.Item disabled>无后序知识簇</Menu.Item>:outCom.map((comId: any) => 
                                <Menu.Item style={{ margin:10}}  key={comId} 
                                onClick={()=>{this.props.clickCom(comId);
                                this.setState({openKeys:[],})}}>
                                  {mapData.topics[sequences[comId][0]]}
                                </Menu.Item>)}
                            </SubMenu>

                      </Menu>
                    </div>
                    <MapCanvas />
                    
                </div>
             </Slide>
            );}
    }
    
}

function mapStateToProps(state: any) {
    const { community } = state;
    const { mapData, inCom, outCom, sequences,comId,subjectData,domainData, mapShown } = community;
    return {
        mapData, inCom, outCom, sequences,comId,domainData,subjectData, mapShown
    };
}

export default connect(mapStateToProps, {clickCom, fetchSubjectData, updateSubjectData, fetchDomainData,updateDomainData,updateMapShown})(Home);