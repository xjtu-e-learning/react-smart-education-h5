import React from 'react';


//import styles from './assemble.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
//@ts-ignore
import { drawTree } from '../../../src/module/facetTree';
// @ts-ignore
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';
import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import { connect } from 'react-redux';
import { updateAssembleShown} from "../../redux/actions";
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

    const { assemble, textCount} = this.props;
    const ordered_assembleContent=String(textCount)+"."+assemble.assembleContent;
    console.log("Assemble props",this.props);
    console.log("Assemble assemble",assemble);
 
    return (

      <div>
        < Grid style={{ padding: 1, marginTop: 6, overflow: 'auto', color: "00AA00" }} 
        item xs={12} key={assemble.assembleId} >
          <Paper style={{ padding: 20, border: 'solid #EEEEEE' }} >
            
            <div>
                <div style={{ padding: 5 }} onClick={this.handleClick}>
                  {
                  this.state.showDetail?
                  (
                    <div dangerouslySetInnerHTML={{ __html: ordered_assembleContent }} />
                  ):
                  (
                    <HTMLEllipsis
                    unsafeHTML={ordered_assembleContent}
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
            e.preventDefault();
    })
    tree1.addEventListener("touchend",function(e){ //区分四个方向
           // console.log(this.props);
            var clientx = endx - startx; 
            var clienty = endy - starty;
            if (Math.abs(clientx) > Math.abs(clienty) && clientx > 0 && clienty>0) { 
                direction1="right";
                that.props.updateAssembleShown(false);
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
const mapStateToProps = (state: any) => {
  const { tree } = state;
  const { treeData } = tree;
  return { treeData };
};

export default connect(mapStateToProps, {updateAssembleShown})(Assemble);
//export default Assemble;
