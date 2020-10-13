import React from "react";
import MapCanvas from "../MapCanvas";
import MapCanvas1 from "../MapCanvas1";
import { connect } from "react-redux";
import { clickCom, fetchSubjectData, updatAlertShown,updateSubjectData ,fetchDomainData, updateDomainData ,updateMapShown,updateDomainShown} from "../../redux/actions";
import {Menu,Typography, Alert, Spin, Button, Tooltip} from 'antd';
import {AppstoreOutlined, BankOutlined} from '@ant-design/icons'
import 'antd/dist/antd.css';
import './index.css'
import Slide from "../../components/Slide";
const Title=Typography.Title;
const { SubMenu } = Menu;
class Home extends React.Component<any, any> {
  mycloseHome=()=>{
    this.props.updateMapShown();
    this.props.updatAlertShown(this.props.alertShown); 
    this.props.updateDomainShown();
  }
  mycloseHome1=()=>{
    this.props.clickCom(-1);
    this.props.updateMapShown();
    this.props.updatAlertShown(this.props.alertShown); 
    this.props.updateDomainShown();
  }
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
        const { inCom, outCom, mapData, sequences,comId,mapShown,updateMapShown,alertShown,domainData} = this.props;
        // if(this.props.alertShown===false){
        //   this.props.updatAlertShown(this.props.alertShown)
        // }
        const width =  document.body.clientWidth;
        if(comId===-1)
            {return (     
              <Slide direction={"right"} offset={1} shown={mapShown} closeFunc={updateMapShown}>        
              <div style={ { height: '100vh', overflow: 'hidden' }}>  
              
                   
                    {/* <Button style={{left:300,top:30,z-index=99}} type="dashed" icon={<BankOutlined />} onClick={() => this.mycloseHome()}>
                        
                    </Button> */}
                   <div className="title1" style={{ position: "absolute", top: 30,width:"100%",height:40,padding:0}}>                     
                  
                      <Title level={3} style={{textAlign:"center",padding:0}}>
                      <AppstoreOutlined /> 知识图谱构建
                      </Title>
                  </div>
              
                    
                  <div style={{ position: "absolute", top: width/2,width:"100%",height:40,padding:0}}>
                  <Spin tip="Constructing..." spinning={alertShown}>
                    
                    {alertShown===true?(
                      <Alert
                      message="智慧教育系统"
                      description="构建中"
                      type="info"
                      showIcon
                      />
                    ):(
                      null
                    )}
                    </Spin>,
                  </div>
                  
                  <MapCanvas/>  
                  <Tooltip title="search">
                          <Button  type="dashed"  onClick={this.mycloseHome} icon={<BankOutlined />}  style={{position:'absolute',left:0,top:30}}/>
                    </Tooltip>
                               
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
                            <Tooltip title="search">
                          <Button  type="dashed"  onClick={this.mycloseHome1} icon={<BankOutlined />}  style={{position:'absolute',left:0,top:5}}/>
                    </Tooltip>
                      </Menu>
                      
                    </div>
                    <MapCanvas1 />      
                </div>
             </Slide>
            );}
    }
    
    // componentDidMount() {
    //   if(this.props.alertShown===false){
    //     this.props.updatAlertShown(this.props.alertShown)
    //   }
    // }
}



function mapStateToProps(state: any) {
    const { community } = state;
    const { mapData, inCom, outCom, sequences,comId,subjectData,domainData, mapShown,alertShown } = community;
    return {
        mapData, inCom, outCom, sequences,comId,domainData,subjectData, mapShown,alertShown
    };
}

export default connect(mapStateToProps, {updatAlertShown,clickCom, fetchSubjectData, updateSubjectData, fetchDomainData,updateDomainData,updateMapShown,updateDomainShown})(Home);