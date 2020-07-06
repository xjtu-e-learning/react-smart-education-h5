import React from 'react';
import { Typography } from 'antd';

import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper/Paper';

// @ts-ignore
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

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

const { Paragraph } = Typography;

class Leaf1 extends React.Component<ILeafProps, any> {
 // @ts-ignore
  extractVideoUrl = (content) => {
    let pattern = new RegExp('http.*mp4');
     // @ts-ignore
    return pattern.exec(content) !== null ? pattern.exec(content)[0] : null;
  };
  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const { assemble } = this.props;
    
    return (
      <Grid item xs={12} key={assemble.assembleId}>

        <Paper >
          <div>
            <AppBar position="static" color="default">
              <Toolbar >
              <h6 style={{ color: '#b869f3' }}>
                    碎片时间：{assemble.assembleScratchTime} 
                  </h6>
              </Toolbar>
            </AppBar>
          </div>
          <Player
            playsInline
            src={this.extractVideoUrl(assemble.assembleContent)}
          >
          </Player>
        </Paper>
      </Grid>
    );
  }
}

export default Leaf1;
