import React from 'react';
import ReactDOM from 'react-dom';
//import '../SubjectContainer/node_modules/antd/dist/antd.css';
import { Card } from 'antd';
import axios from 'axios';
import { fetchMapData,updateMapShown,updateDomainShown } from "../../redux/actions";
import { connect } from 'react-redux';
import {Typography, Alert} from 'antd';
//@ts-ignore
import Paper from '@material-ui/core/Paper/Paper';
//@ts-ignore
import Grid from '@material-ui/core/Grid/Grid';


class CardDomain extends React.Component<any,any>{
    

    render(){
        
        const {domain} = this.props;
        
        //console.log(this.props)
        if(this.props.abnormal === undefined)
        {
            if(domain.shown === false){
                return null;
            }
            else{
                console.log("正常",this.props.abnormal);
            return (
                <div style={{overflow:'auto'}}>
                <Grid style={{ padding: 1, marginTop: 6, overflow: 'auto', color: "00AA00" }} item xs={12} key={domain.domainId} >
                <Paper style={{ padding: 20, border: 'solid #EEEEEE',overflow:'auto' }} >
                        <div onClick={()=>{this.props.fetchMapData(this.props.domain.domainName);this.props.updateMapShown(); }}>
                             {domain.domainName}
                        </div>
                </Paper>
                </Grid>
                </div>
            );
            }
        }
        else{
            if(this.props.abnormal==="0" )
            {return(
                <Alert 
                message="智慧教育系统"
                description="该学科下暂无课程信息"
                type="warning"
                showIcon
                closable
                onClose={this.props.updateDomainShown}
                />
                )
                                     
            }
            else{
                return(
                <Alert 
                message="智慧教育系统"
                description="获取信息失败..."
                type="warning"
                showIcon
                closable
                onClose={this.props.updateDomainShown}
                closeText="点我返回"/>
                )
            }
        }
    }
        componentDidMount() {  
           
            var startx, starty, endx, endy;
            
            let direction1;
            let that = this;
            if(that.props.domain!==undefined)
            {
                if(that.props.domain.domainId==that.props.minId||that.props.minId==-1)
                {    
                    var map = document.getElementById('domain');
                    console.log("这是domain",map);
                    let {count} = this.props;
                    // console.log("课程页",map)
                    map.addEventListener("touchstart",function(e){
                        var touch =e.touches[0];//第一根手指
                        startx = touch.pageX;
                        starty = touch.pageY;
            
                    })
                    map.addEventListener("touchmove",function(e){
                        var touch =e.changedTouches[0].clientX;//第一根手指
                        endx = e.changedTouches[0].clientX;
                        endy = e.changedTouches[0].clientY;
                        //e.preventDefault();
                    })
                    map.addEventListener("touchend",function(e){ //区分四个方向
                        // console.log(this.props);
                        // console.log("###############")
            
                        var clientx = endx - startx;
                        var clienty = endy - starty;
                        // console.log("start,end,x位移",startx,endx,clientx);
                        // console.log("start,end,y位移",starty,endy,clienty);
                        if (Math.abs(clientx) > 4*Math.abs(clienty) && clientx > 0 && clienty>0) {
                            direction1="right";

                                console.log("这是返回",that.props.minId);
                                that.props.updateDomainShown();                          
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
                        else {
                            direction1="click";
                        }
                        console.log("d",direction1)
                    })
                }
            }
            else{
                var map = document.getElementById('domain');
                console.log("这是domain",map);
                let {count} = this.props;
                // console.log("课程页",map)
                map.addEventListener("touchstart",function(e){
                    var touch =e.touches[0];//第一根手指
                    startx = touch.pageX;
                    starty = touch.pageY;
        
                })
                map.addEventListener("touchmove",function(e){
                    var touch =e.changedTouches[0].clientX;//第一根手指
                    endx = e.changedTouches[0].clientX;
                    endy = e.changedTouches[0].clientY;
                    //e.preventDefault();
                })
                map.addEventListener("touchend",function(e){ //区分四个方向
                    // console.log(this.props);
                    // console.log("###############")        
                    var clientx = endx - startx;
                    var clienty = endy - starty;
                    // console.log("start,end,x位移",startx,endx,clientx);
                    // console.log("start,end,y位移",starty,endy,clienty);
                    if (Math.abs(clientx) > 4*Math.abs(clienty) && clientx > 0 && clienty>0) {
                        direction1="right";
                        console.log("这是返回",that.props.minId);
                        that.props.updateDomainShown();                          
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
                    else {
                        direction1="click";
                    }
                    console.log("d",direction1)
                })
            }
        }

}

function mapStateToProps(state: any) {
    const { community } = state;
     const { mapData} = community;
  
     return {
         mapData
     };
}
export default connect(mapStateToProps, {fetchMapData,updateMapShown,updateDomainShown})(CardDomain);