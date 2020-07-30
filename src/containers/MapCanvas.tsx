import React from 'react';
// @ts-ignore
import { gaozhongshuxue } from '../module/topicDependenceVisualization';
// @ts-ignore
import { drawCommunity, drawTopic } from '../module/topicDependenceVisualization';
import { connect } from "react-redux";
import { isEqual ,isEmpty} from 'lodash';
import { clickCom, clickTopic,clickTopicName, fetchTreeData, updateMapShown, updateMapData, updateSequences } from "../redux/actions";
import {Select} from 'antd';

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
            // const sequences = drawCommunity(this.props.mapData, svg as HTMLElement, (d: any) => this.props.clickCom(d.id));
            // this.props.updateSequences(sequences);
        } else {
            const svg = document.getElementById('map');
            emptyChildren(svg);
            drawTopic(comId, this.props.mapData, svg as HTMLElement, (d: any) => {
                this.props.clickTopic(d);
                this.props.clickTopicName(this.props.mapData.topics[d]);
                this.props.fetchTreeData(this.props.mapData.topics[d]);
                this.props.updateShown();
            });
        }
        return false;
    }

    // componentDidMount() {
        // const { clickCom } = this.props;
        // //this.props.updateMapData(gaozhongshuxue);
        // this.props.updateMapData(this.props.mapData);
        // if (document.getElementById('map') !== null) {
        //     const sequences =drawCommunity(this.props.mapData, document.getElementById('map') as HTMLElement, (d: any) => clickCom(d.id));
        //     this.props.updateSequences(sequences);
        // }
    //判断topics是否为空
    componentDidMount() {
            const { clickCom } = this.props;
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
             this.props.updateMapData(this.props.mapData);
            if (document.getElementById('map') !== null) {
                const sequences =drawCommunity(this.props.mapData, document.getElementById('map') as HTMLElement, (d: any) => clickCom(d.id));
              // this.props.updateSequences(sequences);
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
    const { community } = state;
    const { mapData, comId } = community;

    return { mapData, comId};
};

export default connect(mapStateToProps, { clickCom,clickTopic, clickTopicName, fetchTreeData, updateMapShown, updateMapData, updateSequences })(MapCanvas);
