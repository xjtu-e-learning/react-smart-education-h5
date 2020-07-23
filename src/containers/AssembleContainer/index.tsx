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
}

function mapStateToProps(state: any) {
    const { tree } = state;
    const { assembleData, assembleShown } = tree;
    return { assembleData, assembleShown};
}

export default connect(mapStateToProps, {updateAssembleShown})(AssembleContainer);