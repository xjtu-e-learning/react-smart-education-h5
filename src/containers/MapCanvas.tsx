import React from 'react';
// @ts-ignore
import { gaozhongshuxue } from '../module/topicDependenceVisualization';
// @ts-ignore
import { drawCommunity, drawTopic } from '../module/topicDependenceVisualization';
import { connect } from "react-redux";
import { isEqual ,isEmpty} from 'lodash';
import { clickCom, clickTopic,clickTopicName, fetchTreeData, updateMapShown, updateMapData, updateSequences,updateShown,updatAlertShown } from "../redux/actions";
import {Select,Alert} from 'antd';

class MapCanvas extends React.Component<any, any> {
    myclose=()=>{
        this.props.updateMapShown();
        this.props.updatAlertShown(this.props.alertShown); 
    }
    render() {console.log("mapData",this.props.mapData);
        if(this.props.mapData!=[])
        {
            if(this.props.mapData.topics!={}&&this.props.mapData.relationCrossCommunity!=undefined)
            {
                if(this.props.mapData.relationCrossCommunity.length==0&&this.props.alertShown==false)
                {
                    return (
                
                        <div style={{ position: "relative", top: "50%", marginTop: "-50vw" }}>
                            
                            
                            <Alert 
                                message="智慧教育系统"
                                description="该课程下暂无数据"
                                type="warning"
                                showIcon
                                closable
                                onClose={this.myclose}
                                />
                            <svg id="map" width="100vw" height="100vw" onClick={this.updateSeq} >
                            </svg>
                        </div>
            
                    );
                }else
                {return (
                    
                    <div style={{ position: "relative", top: "50%", marginTop: "-50vw" }}>
                        <svg id="map" width="100vw" height="100vw" onClick={this.updateSeq}>
                        </svg>
                        <p id="map"></p>
                    </div>
        
                );}
            }else
            {return (
                
                <div style={{ position: "relative", top: "50%", marginTop: "-50vw" }}>
                    <svg id="map" width="100vw" height="100vw" onClick={this.updateSeq}>
                    </svg>
                    <p id="map"></p>
                </div>
    
            );}
        }
        else
        {return (
            
            <div style={{ position: "relative", top: "50%", marginTop: "-50vw" }}>
                <svg id="map" width="100vw" height="100vw" onClick={this.updateSeq}>
                </svg>
                <p id="map"></p>
            </div>

        );}
    }
    updateSeq=()=>{
        const svg = document.getElementById('map');
       // console.log("updateSeq",this.props);
        const {alertShown} = this.props;
        emptyChildren(svg);
        console.log(this.props.mapData)
        
        if(this.props.mapData.length!==0){

            const seq=drawCommunity(this.props.mapData, svg as HTMLElement, (d: any) => this.props.clickCom(d.id));
            if(this.props.sequences[0]===undefined&&seq[0]!==undefined){
            console.log("!",seq.length);
            this.props.updateSequences(seq);
        }  
        }
    }

    componentDidMount() {
            const { comId } = this.props;     
            // if (comId !== -1) {
            //     const svg = document.getElementById('map');
            //    // emptyChildren(svg);
                
            //     drawTopic(comId, this.props.mapData, svg as HTMLElement, (d: any) => {
            //         this.props.clickTopic(d);
            //         this.props.clickTopicName(this.props.mapData.topics[d]);
            //         this.props.fetchTreeData(this.props.mapData.topics[d]);
            //         this.props.updateShown();
            //     });
            //     var startx, starty, endx, endy;
            //     let direction1;
            //     let that = this;
            //     var map = document.getElementById('map');
            //     map.addEventListener("touchstart",function(e){
            //             var touch =e.touches[0];//第一根手指
            //             startx = touch.pageX;
            //             starty = touch.pageY;
            //     })
            //     map.addEventListener("touchmove",function(e){
            //             var touch =e.changedTouches[0].clientX;//第一根手指
            //             endx = e.changedTouches[0].clientX;
            //             endy = e.changedTouches[0].clientY;
            //             e.preventDefault();
            //     })
            //     map.addEventListener("touchend",function(e){ //区分四个方向
            //            // console.log(this.props);
            //            console.log("###############")
            //            console.log("comID",that.props.comId);
         
            //             var clientx = endx - startx;
            //             var clienty = endy - starty;
            //             console.log("start,end,x位移",startx,endx,clientx);
            //             console.log("start,end,y位移",starty,endy,clienty);
            //             if (Math.abs(clientx) > 4*Math.abs(clienty) && clientx > 0 && clienty>0) {
            //                 direction1="right";
            //              //   that.props.clickCom(-1);
            //             }
            //             else if (Math.abs(clientx) > Math.abs(clienty) && clientx < -document.body.clientWidth/2) {
            //                 direction1="left";
            //             }
            //             else if (Math.abs(clientx) < Math.abs(clienty) && clienty > document.body.clientHeight/2) {
            //                 direction1="down";
            //             }
            //             else if (Math.abs(clientx) < Math.abs(clienty) && clienty < -document.body.clientHeight/2) {
            //                 direction1="up";
            //             }
            //     })
            // } else 
            {
               // console.log(document.getElementById('map'));
                var event = document.createEvent("HTMLEvents");
                event.initEvent("click", true, true);
                var svg = document.getElementById('map');
                emptyChildren(svg);
                svg.dispatchEvent(event);
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
                        var clientx = endx - startx;
                        var clienty = endy - starty;
                     //   console.log("start,end,x位移",startx,endx,clientx);
                     //   console.log("start,end,y位移",starty,endy,clienty);
                        if (Math.abs(clientx) > 4*Math.abs(clienty) && clientx > 0 && clienty>0) {
                            direction1="right"; 
                            that.props.updateMapShown();
                            that.props.updatAlertShown(that.props.alertShown);                        
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

export default connect(mapStateToProps, { updatAlertShown,clickCom,clickTopic, clickTopicName, fetchTreeData, updateMapShown, updateMapData, updateSequences,updateShown})(MapCanvas);
