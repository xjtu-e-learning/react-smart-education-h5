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

class AssembleContainer extends React.Component<any, any> {
    state = {
        showDetail:false,
        TextOrVideo:0,
    }
      // @ts-ignore
    handleClickTextOrVideo = (event, value) => {
        this.setState({ TextOrVideo: value })
      }
    render() {
       // console.log("assemble的index页面",this.props);
        const { assembleData, assembleShown, updateAssembleShown } = this.props;
        const value = this.state.TextOrVideo;


        let labeltext = '富文本 ' ;
        let labelvideo = '视频 ' ;


        return (
            
        <Slide direction={"bottom"} offset={0.5} shown={assembleShown} closeFunc={updateAssembleShown}>
          <AppBar position="static" color="default">
            <Toolbar>
              <Tabs value={value} onChange={this.handleClickTextOrVideo}>
                <Tab label={labeltext} />
                <Tab label={labelvideo} />
              </Tabs>
            </Toolbar>
          </AppBar>
          {
              <div>
                  {
                      value === 0?(
                        assembleData && assembleData.map((assemble: {assembleId:number;assembleContent:string;assembleScratchTime:string;facetId:number;domainId:number;type:string;}) => (
                            assemble.type === 'text'? (
                                <Assemble assemble={assemble} key={assemble.assembleId} />
                            ):
                            (
                                null
                            )
                        ))
                      ):
                      (
                        assembleData && assembleData.map((assemble: {assembleId:number;assembleContent:string;assembleScratchTime:string;facetId:number;domainId:number;type:string;}) => (
                            assemble.type === 'video'? (
                                <Video assemble={assemble} key={assemble.assembleId} />
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