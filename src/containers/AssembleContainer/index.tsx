import React from "react";
import Slide from "../../components/Slide";
import {connect} from "react-redux";
import {updateAssembleShown} from "../../redux/actions";
import Assemble from "./assemble";
import Leaf1 from "./video";
import { Button, Tooltip } from "antd";
import {Typography} from 'antd';
import {AppstoreOutlined, BankOutlined} from '@ant-design/icons';
import { updateDomainShown,updateMapShown,updateShown,updatAlertShown,clickCom} from "../../redux/actions";


class AssembleContainer extends React.Component<any, any> {
  myclose=()=>{
    this.props.updateAssembleShown();
    this.props.updateShown();
    this.props.clickCom(-1);
    this.props.updateMapShown();
    this.props.updatAlertShown(this.props.alertShown);
    this.props.updateDomainShown();  
  }
    state = {
        showDetail:false,
        TextOrVideo:0,

    }
    constructor(props){
      super(props);
      this.state={
        showDetail:false,
        TextOrVideo:0,

      };
      this.textCount = 0;
      this.videoCount = 0;
    }
    textCount=0;
    videoCount=0;
    addText(flag){
      if(flag)
      {this.textCount=this.textCount+1;
      return true;}
      else{return false;};
    }
    addText1(flag){
      if(flag)
      {this.textCount=this.textCount+1;
      return this.textCount;}
      else{return false;};
    }
    addVideo(flag){
      if(flag)
      {this.videoCount=this.videoCount+1;
      return true;}
      else{return false;};
    }
      // @ts-ignore
    handleClickTextOrVideo = (event, value) => {
        this.setState({ TextOrVideo: value })
      }
    render() {
        const { assembleData, assembleShown, updateAssembleShown } = this.props;
        const value = this.state.TextOrVideo;
        this.textCount=0;
        const Title=Typography.Title;
        return (
          
          <Slide direction={"bottom"} offset={1} shown={assembleShown} closeFunc={updateAssembleShown}>
         
          <div  style={{ position: "relative", top: 30,width:"100%",height:40,padding:0}}>                     
                      <Title level={3}
                      style={{textAlign:"center",padding:0}}
                      >
                      <AppstoreOutlined /> 知识列表
                    </Title>
          </div>

          {
              <div id="assemble" style={{ position: "absolute", top: 60,width:"100%",bottom:0,overflow:"auto",padding:0}}>
                  {
                    (this.props.assembleData.length!==0)?
                      (value === 0?(
                        assembleData && assembleData.map((assemble: {assembleId:number;assembleContent:string;assembleScratchTime:string;acetId:number;domainId:number;type:string;}) => (
                            this.addText(assemble.type === 'text'|| assemble.type === null)? (                             
                                <Assemble assemble={assemble} key={assemble.assembleId} textCount={this.textCount} />
                            ):
                            (
                              //@ts-ignore
                              <Leaf1 assemble={assemble} key={assemble.assembleId} textCount={this.addText1(this.textCount)}/>
                            )
                        ))
                      ):
                      (
                        assembleData && assembleData.map((assemble: {assembleId:number;assembleContent:string;assembleScratchTime:string;facetId:number;domainId:number;type:string;}) => (
                          this.addVideo(assemble.type === 'video')? (
                               //@ts-ignore
                                <Leaf1 assemble={assemble} key={assemble.assembleId} textCount={this.addText1(this.textCount)}/>
                            ):
                            (
                               null
                            )
                        ))
                      )):(
                        <Assemble abnormal={0} />
                        
                      )
                  }
              </div>
          }
          <Tooltip title="search">
                          <Button  type="dashed"  onClick={this.myclose} icon={<BankOutlined />}  style={{position:'absolute',left:0,top:30}}/>
                    </Tooltip>
        </Slide>
        );
    }
    componentDidMount() {
      var startx, starty, endx, endy;
      let direction1;
      let that = this;
      var tree1 = document.getElementById('assemble');
     tree1.addEventListener("touchstart",function(e){
          var touch =e.touches[0];//第一根手指
              startx = touch.pageX;
              starty = touch.pageY;
      })
      tree1.addEventListener("touchmove",function(e){
              var touch =e.touches[0];//第一根手指
              endx = touch.pageX;
              endy = touch.pageY;
              
      })
      tree1.addEventListener("touchend",function(e){ //区分四个方向
              var clientx = endx - startx; 
              var clienty = endy - starty;
              if (Math.abs(clientx) > Math.abs(clienty) && clientx > 0 && clienty>0) { 
                  direction1="right";
                  if(that.props.textCount==1)
                  {that.props.updateAssembleShown(false);}
              }
              else if (Math.abs(clientx) > Math.abs(clienty) && clientx < -document.body.clientWidth/2) {
                  direction1="left";
              }
              else if (Math.abs(clientx) < Math.abs(clienty) && clienty > document.body.clientHeight/2) {
                  direction1="down";
              }
              else if (Math.abs(clientx) < Math.abs(clienty) && clienty < -document.body.clientHeight/2) {
                  direction1="up";
                  
              }
      })
      
       
   }
}

function mapStateToProps(state: any) {
    const { tree } = state;
    const { assembleData, assembleShown } = tree;
    return { assembleData, assembleShown};
}

export default connect(mapStateToProps, {updateAssembleShown,updateDomainShown,updateMapShown,updateShown,updatAlertShown,clickCom})(AssembleContainer);