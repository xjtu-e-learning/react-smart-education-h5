import React from 'react';
// @ts-ignore
import { gaozhongshuxue } from '../module/topicDependenceVisualization';
// @ts-ignore
import { drawCommunity, drawTopic } from '../module/topicDependenceVisualization';
import { connect } from "react-redux";
import { isEqual ,isEmpty} from 'lodash';
import { clickCom, clickTopic,clickTopicName, fetchTreeData, updateMapShown, updateMapData, updateSequences,updateShown,updatAlertShown } from "../redux/actions";
import {Select} from 'antd';

class MapCanvas1 extends React.Component<any, any> {
    
    render() {console.log("seq",this.props.seq);
        return (
            
            <div style={{ position: "relative", top: "50%", marginTop: "-50vw" }}>
                <svg id="map1" width="100vw" height="100vw" >
                </svg>
                <p id="map1"></p>
            </div>

        );
    }
    // updateSeq=()=>{
    //     const svg = document.getElementById('map1');
    //     console.log("updateSeq",this.props);
    //     const {alertShown} = this.props;
    //     emptyChildren(svg);
    //     console.log(this.props.mapData)
        
    //     if(this.props.mapData.length!==0){
    //         const seq=drawCommunity(this.props.mapData, svg as HTMLElement, (d: any) => this.props.clickCom(d.id));
    //         if(this.props.sequences[0]===undefined&&seq[0]!==undefined){
    //         console.log("!",seq.length);
    //         this.props.updateSequences(seq);
    //         this.props.updatAlertShown(alertShown);
    //     }  
    //     }
    // }

    componentDidMount() {
            const { comId } = this.props;     
           
                const svg = document.getElementById('map1');
                const svg1 = document.getElementById('map');
                emptyChildren(svg1);
                drawTopic(comId, this.props.mapData, svg as HTMLElement, (d: any) => {
                    this.props.clickTopic(d);
                    this.props.clickTopicName(this.props.mapData.topics[d]);
                    this.props.fetchTreeData(this.props.mapData.topics[d]);
                    this.props.updateShown();
                });
                var startx, starty, endx, endy;
                let direction1;
                let that = this;
                var map = document.getElementById('map1');
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

function emptyChildren(dom: HTMLElement | null): void {
    if (!dom) return;
    const children = dom.childNodes;
    while (children.length > 0) {
        dom.removeChild(children[0]);
    }
}

const mapStateToProps = (state: any) => {
    const { community } = state;
    const { mapData, comId,sequences,alertShown } = community;

    return { mapData, comId,sequences,alertShown};
};

export default connect(mapStateToProps, { updatAlertShown,clickCom,clickTopic, clickTopicName, fetchTreeData, updateMapShown, updateMapData, updateSequences,updateShown})(MapCanvas1);
