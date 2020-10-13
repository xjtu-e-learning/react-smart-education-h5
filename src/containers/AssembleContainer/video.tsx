import React from 'react';
import { Typography } from 'antd';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper/Paper';

// @ts-ignore
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';

import { connect } from 'react-redux';
import { updateAssembleShown,updateDomainShown,updateMapShown,updateShown,updatAlertShown,clickCom} from "../../redux/actions";

interface ILeafProps {
  assemble: {
    assembleId: number;
    assembleContent: string;
    assembleScratchTime: string;
    facetId: number;
    sourceId: number;
    domainId: number;
    type: string;
  }
}
const StyledBadge = withStyles((theme) => ({
  anchorOriginTopRightRectangle: {
    top: 0,
    right: 0,
    transform: 'scale(1) translate(150%, 50%)',
    transformOrigin: '100% 0%',
    '&$invisible': {
      transform: 'scale(0) translate(50%, -50%)'
    }
  },
}))(Badge);

class Leaf1 extends React.Component<ILeafProps, any> {
 // @ts-ignore
  extractVideoUrl = (content) => {
    let pattern = new RegExp('http.*mp4');
     // @ts-ignore
    return pattern.exec(content) !== null ? pattern.exec(content)[0] : null;
  };
  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    //@ts-ignore
    const {assemble,textCount} = this.props;
    console.log("video页面",this.props)
    return (
      <Grid item xs={12} key={assemble.assembleId}>

     <Paper style={{ padding: 20, border: 'solid #EEEEEE' ,position:"relative"}} >
        <div style={{ padding: 5,width:"20%",float:"left",height:"auto",position:"absolute",top:0,bottom:0,}}>
               
                {textCount===1?
                    (<StyledBadge  badgeContent={textCount} color="secondary" > 
                    </StyledBadge>):
                    (<StyledBadge badgeContent={textCount} color="primary" > 
                    </StyledBadge>)
                }  
        </div>
        <div style={{ padding: 5 ,height:"auto",width:"80%",marginLeft:"auto"}}  >
          <Player
            playsInline
            src={this.extractVideoUrl(assemble.assembleContent)}
          >
          </Player>
          </div>
        </Paper>

      </Grid>
    );
  }
}
const mapStateToProps = (state: any) => {
  const { tree } = state;
  const { treeData } = tree;
  return { treeData };
};

export default connect(mapStateToProps, {updateAssembleShown,updateDomainShown,updateMapShown,updateShown,updatAlertShown,clickCom})(Leaf1);

