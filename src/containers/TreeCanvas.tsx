import React from 'react';
import {isEmpty, isEqual} from "lodash";
import {connect} from "react-redux";
// @ts-ignore
import { drawTree } from '../module/facetTree';
import {fetchAssembleData, updateAssembleShown,updateShown} from "../redux/actions";
import { Alert } from 'antd';

class TreeCanvas extends React.Component<any, any> {
    state = {
        noInformation: true,
      };
      change = () => {
        this.setState( {noInformation: false} )
      }
    render() {
        //console.log("Tree Canvas this.props.treeData",this.props.treeData);
        
        return (
            <div id={'topic'} style={{position: "relative", top: "50%", marginTop: "-50vw"}}>
                {
                this.state.noInformation?(
                    <svg  id={"tree"} width={"100vw"} height={"120vw"} >
                    </svg>
                ):(
                    <Alert 
                    message="智慧教育系统"
                    description="你似乎来到了没有知识的荒野..."
                    type="warning"
                    showIcon
                    closable
             />
                    
                )
            }
            </div>
            
        );
    }
    componentDidMount() {
       var startx, starty, endx, endy;
       let direction1;
       let that = this;
       var tree1 = document.getElementById('topic');
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
                   that.props.updateShown(false);
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
        if (isEmpty(this.props.treeData)) return;
        const tree = document.getElementById('tree');
        emptyChildren(tree);
        if (isEmpty(this.props.treeData.children)) 
        {
            this.change();
            console.log("没有数据");
        }
        else{
            drawTree(tree, this.props.treeData, (d:any) => {
               // console.log("d",d);
                this.props.fetchAssembleData(d);
                this.props.updateAssembleShown();
            });
        }
        
    }

}

function emptyChildren(dom: HTMLElement | null): void {
    if (!dom) return;
    const children = dom.childNodes;
    while (children.length > 0) {
        dom.removeChild(children[0]);
    }
}

const mapStateToProps = (state: any) => {
    const { tree } = state;
    const { treeData } = tree;
    return { treeData };
};

export default connect(mapStateToProps, {fetchAssembleData, updateAssembleShown,updateShown})(TreeCanvas);