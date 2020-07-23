import React from 'react';
// @ts-ignore
import { gaozhongshuxue } from '../module/topicDependenceVisualization';
// @ts-ignore
import { drawCommunity, drawTopic } from '../module/topicDependenceVisualization';
import { connect } from "react-redux";
import { isEqual } from 'lodash';
import { clickCom, clickTopic,clickTopicName, fetchTreeData, updateShown, updateMapData, updateSequences } from "../redux/actions";

class MapCanvas extends React.Component<any, any> {
    
    render() {
        
       
        return (
            <div style={{ position: "relative", top: "50%", marginTop: "-50vw" }}>
                <svg id="map" width="100vw" height="100vw">
                </svg>
                
               
                
            </div>
        );
    }

    
    shouldComponentUpdate(nextProps: { comId: any; }, nextState: any) {
        if (isEqual(nextProps, this.props)) return false;
        const { comId } = nextProps;
       
         
        if (comId === -1) {
            const svg = document.getElementById('map');
            emptyChildren(svg);
            drawCommunity(gaozhongshuxue, svg as HTMLElement, (d: any) => this.props.clickCom(d.id));
        } else {
            const svg = document.getElementById('map');
            emptyChildren(svg);
            drawTopic(comId, gaozhongshuxue, svg as HTMLElement, (d: any) => {
                this.props.clickTopic(d);
                this.props.clickTopicName(gaozhongshuxue.topics[d]);
                this.props.fetchTreeData(gaozhongshuxue.topics[d]);
                this.props.updateShown();
            });
        }
        return false;
    }

    componentDidMount() {

        const { clickCom } = this.props;
       // console.log(this.props);
       var startx, starty, endx, endy;
       let direction1;
       let that = this;
       var map = document.getElementById('map');
       map.addEventListener("touchstart",function(e){
               var touch =e.touches[0];//第一根手指
               startx = touch.pageX;
               starty = touch.pageY;
               
       })
       map.addEventListener("touchmove",function(e){
               var touch =e.changedTouches[0].clientX;//第一根手指
               endx = e.changedTouches[0].clientX;
               endy = e.changedTouches[0].clientY;
               e.preventDefault();
       })
       map.addEventListener("touchend",function(e){ //区分四个方向
              // console.log(this.props);
              console.log("###############")
              console.log("comID",that.props.comId);

               var clientx = endx - startx; 
               var clienty = endy - starty;
               console.log("start,end,x位移",startx,endx,clientx);
               console.log("start,end,y位移",starty,endy,clienty);
               if (Math.abs(clientx) > 4*Math.abs(clienty) && clientx > 0 && clienty>0) { 
                   direction1="right";
                   that.props.clickCom(-1);
                   //console.log(that.props.clickCom(-1));
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
        this.props.updateMapData(gaozhongshuxue);
        if (document.getElementById('map') !== null) {
            const sequences =drawCommunity(gaozhongshuxue, document.getElementById('map') as HTMLElement, (d: any) => clickCom(d.id));
            this.props.updateSequences(sequences);
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


// function load(){
    
//     let direction = 'ltr';
//     document.addEventListener('touchstart',touch, false);
//     document.addEventListener('touchmove',touch, false);
//     document.addEventListener('touchend',touch, false);                        

//     return direction;

    
// }
// function touch (event){
   
//     var direction1 = 'ltr';
//     var event = event || window.event;    
//     var oInp = document.getElementById("inp");
//     var distance,clientX_start,clientX_end,
//         minRange=10;
//         // eslint-disable-next-line @typescript-eslint/no-unused-expressions
//         this.clientX_start;
//         // eslint-disable-next-line @typescript-eslint/no-unused-expressions
//         this.direction;

//         this.callbackFun=function(){
//         if(this.direction=='ltr') {
//             this.props.clickCom(-1);
//             //console.log('从左往右');
//         }
//         else {
//            //console.log('从右往左');
//         }
//         }
//     switch(event.type){
//         case "touchstart":
//             clientX_start=event.touches[0].clientX;
//             this.clientX_start=clientX_start;
//             break;
//         case "touchend":
//             this.callbackFun();
//             break;
//         case "touchmove":
//            // event.preventDefault();
           
//             clientX_end = event.changedTouches[0].clientX;
//             //判断移动的方向
//             distance=clientX_end-this.clientX_start;
//             if(this.clientX_start+minRange<clientX_end) {
//                 this.direction='ltr';
//                 //this.props.clickCom(-1);
//                // this.state.comId = -1;
//                 direction1 = this.direction;
               
//             }
//             else if(this.clientX_start-minRange>clientX_end){
//                 this.direction='rtl';
//                 direction1 = this.direction;
               
//             }
//             break;
        
//     }  
//     return direction1;
   
// };
 
// function ontouchstart(e){
//     var touch = e.touches[0];
//     var x = touch.clientX;
//     var y = touch.clientY;
//     console.log(x,y);
//     return [x,y];
// }

// function ontouchmove(e){
//     e.preventDefault();
// }



const mapStateToProps = (state: any) => {
    const { community } = state;
    const { mapData, comId } = community;
   
    return { mapData, comId};
};

export default connect(mapStateToProps, { clickCom,clickTopic, clickTopicName, fetchTreeData, updateShown, updateMapData, updateSequences })(MapCanvas);