import React from "react";
import Slide from "../../components/Slide";
import {connect} from "react-redux";
import {updateAssembleShown} from "../../redux/actions";
import Assemble from "./assemble";
import Video from "./assemble";
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Tag } from "antd";

class AssembleContainer extends React.Component<any, any> {
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
      this.textCount=0;
    }
    textCount=0;
    videoCount=0;
    addText(flag){
      if(flag)
      {this.textCount=this.textCount+1;
      return true;}
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
       // console.log("assemble的index页面",this.props);
        const { assembleData, assembleShown, updateAssembleShown } = this.props;
        const value = this.state.TextOrVideo;
        this.textCount=0;

        let labeltext = '富文本 ' ;
        let labelvideo = '视频 ' ;

        
        return (
            
          <Slide direction={"bottom"} offset={1} shown={assembleShown} closeFunc={updateAssembleShown}>
          
          {
              <div id="assemble">
                  {
                      value === 0?(
                        assembleData && assembleData.map((assemble: {assembleId:number;assembleContent:string;assembleScratchTime:string;acetId:number;domainId:number;type:string;}) => (
                            this.addText(assemble.type === 'text')? (                             
                                <Assemble assemble={assemble} key={assemble.assembleId} textCount={this.textCount} />
                            ):
                            (
                                null
                            )
                        ))
                      ):
                      (
                        assembleData && assembleData.map((assemble: {assembleId:number;assembleContent:string;assembleScratchTime:string;facetId:number;domainId:number;type:string;}) => (
                          this.addVideo(assemble.type === 'video')? (

                                <Video assemble={assemble} key={assemble.assembleId} videoCount={this.videoCount}/>
                            ):
                            (
                               null
                            )
                        ))
                      )
                  }
              </div>
          }
        </Slide>
        );
    }
    componentDidMount() {
      var startx, starty, endx, endy;
      let direction1;
      let that = this;
      var tree1 = document.getElementById('assemble');
     // var slide1 = document.getElementById('Slide');
     tree1.addEventListener("touchstart",function(e){
          var touch =e.touches[0];//第一根手指
              startx = touch.pageX;
              starty = touch.pageY;
      })
      tree1.addEventListener("touchmove",function(e){
              var touch =e.touches[0];//第一根手指
              endx = touch.pageX;
              endy = touch.pageY;
              //e.preventDefault();
      })
      tree1.addEventListener("touchend",function(e){ //区分四个方向
             // console.log(this.props);
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
             // console.log(direction1)
      })
      
       
   }
}

function mapStateToProps(state: any) {
    const { tree } = state;
    const { assembleData, assembleShown } = tree;
    return { assembleData, assembleShown};
}

export default connect(mapStateToProps, {updateAssembleShown})(AssembleContainer);