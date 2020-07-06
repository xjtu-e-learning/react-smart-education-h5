import React from 'react';


//import styles from './assemble.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

// @ts-ignore
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';
import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper/Paper';

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



class Assemble extends React.Component<any, any> {

  state = {
    showDetail: false,
  };
  handleClick = () =>{
    this.setState({showDetail:!this.state.showDetail})
  }
  
  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

    const { assemble } = this.props;

    console.log("Assemble props",this.props);
    console.log("Assemble assemble",assemble);
 
    return (


      <div>
        < Grid style={{ padding: 1, marginTop: 6, overflow: 'auto', color: "00AA00" }} item xs={12} key={assemble.assembleId} >
          <Paper style={{ padding: 20, border: 'solid #EEEEEE' }} >
            <div>
              <AppBar position="static" color="default" >
                <Toolbar>
                  <h6 style={{ color: '#b869f3' }}>
                    碎片时间：{assemble.assembleScratchTime} 
                  </h6>
                </Toolbar>
              </AppBar>
            </div>
            <div>
                <div style={{ padding: 5 }} onClick={this.handleClick}>
                  {
                  this.state.showDetail?
                  (
                    <div dangerouslySetInnerHTML={{ __html: assemble.assembleContent }} />
                  ):
                  (
                    <HTMLEllipsis
                    unsafeHTML={assemble.assembleContent}
                    maxLine="3"
                    ellipsisHTML="<a>...查看更多</a>"
                    basedOn="letters"
                 />
                
                  )
                }
            </div>
            </div>
          </Paper>
        </Grid >
      </div>






    )
  }
}

export default Assemble;
