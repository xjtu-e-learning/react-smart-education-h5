import React from "react";
import Slide from "../../components/Slide";
import {connect} from "react-redux";
import { fetchSubjectData, updateSubjectData,fetchDomainData, updateDomainData,updateDomainShown} from "../../redux/actions";
//@ts-ignore
import Toolbar from '@material-ui/core/Toolbar';
//@ts-ignore
import AppBar from '@material-ui/core/AppBar';
//@ts-ignore
import Tabs from '@material-ui/core/Tabs';
//@ts-ignore
import CardDomain from "./Card";
import {Typography, Alert} from 'antd';
import {AppstoreOutlined} from '@ant-design/icons'
import { isEmpty } from "lodash";
var tmp;

class Card extends React.Component<any, any> {
    state = {
        noInformation: true,
      };
    change = () => {
        this.setState( {noInformation: false} )
      }
    render() {
       
        
        
        // console.log('????', this.props.fetchDomainData("计算机科学"));
        var minId=-1;
        const Title=Typography.Title;
        const {domainShown,updateDomainShown} = this.props;
        console.log("sssss",this.props.domainData);
        if((this.props.domainData).length!==undefined)
        {
            this.props.domainData.map((domain: {domainId})=>
            {
                if(minId==-1){minId=domain.domainId}
                else{if(minId>domain.domainId)
                    {minId=domain.domainId}}
            })
        }
        console.log(minId);
        return (
            
            <Slide direction={"right"} offset={1} shown={domainShown} closeFunc={updateDomainShown}>
                <div>
                    <div className="title" style={{ position: "relative", top: 30,width:"100%",height:40,padding:0}}>                     
                    <Title level={3} id="using"
                    style={{textAlign:"center",padding:0}}
                    >
                    <AppstoreOutlined /> 课程列表
                    </Title>
                    </div>
                   <div id="domain" style={{overflow:'auto',position:"absolute",width:"100%",top: 80, bottom:0}}>
                    {
                        ((this.props.domainData).length!==undefined)? 
                            ( ((this.props.domainData).length!==0)?
                                   this.props.domainData.map(
                                       (domain: {domainId:number;domainName:string;subjectId:number}) =>
                                   <CardDomain domain={domain } key={domain.domainId} minId={minId}/>):                                   
                                   <CardDomain abnormal="0"/>
                                     ):                             
                        ( <CardDomain abnormal="1"/>  )
                    }     
                    </div>
                </div>
               
            </Slide>
            
        );
    }

    // componentDidMount() {  
          
    //     var startx, starty, endx, endy;
    //       let direction1;
    //       let that = this;
    //       var map = document.getElementById('domain');
    //      // console.log("课程页",map)
    //       map.addEventListener("touchstart",function(e){
    //               var touch =e.touches[0];//第一根手指
    //               startx = touch.pageX;
    //               starty = touch.pageY;
  
    //       })
    //       map.addEventListener("touchmove",function(e){
    //               var touch =e.changedTouches[0].clientX;//第一根手指
    //               endx = e.changedTouches[0].clientX;
    //               endy = e.changedTouches[0].clientY;
    //               //e.preventDefault();
    //       })
    //       map.addEventListener("touchend",function(e){ //区分四个方向
    //           // console.log(this.props);
    //          // console.log("###############")
  
    //               var clientx = endx - startx;
    //               var clienty = endy - starty;
    //              // console.log("start,end,x位移",startx,endx,clientx);
    //              // console.log("start,end,y位移",starty,endy,clienty);
    //               if (Math.abs(clientx) > 4*Math.abs(clienty) && clientx > 0 && clienty>0) {
    //                   direction1="right";
                     
    //                       that.props.updateDomainShown();
                      
    //               }
    //               else if (Math.abs(clientx) > Math.abs(clienty) && clientx < -document.body.clientWidth/2) {
    //                   direction1="left";
    //               }
    //               else if (Math.abs(clientx) < Math.abs(clienty) && clienty > document.body.clientHeight/2) {
    //                   direction1="down";
    //               }
    //               else if (Math.abs(clientx) < Math.abs(clienty) && clienty < -document.body.clientHeight/2) {
    //                   direction1="up";
    //               }
    //               else {
    //                   direction1="click";
    //               }
    //               //console.log("d",direction1)
    //       })
    // }
    
}
  


function mapStateToProps(state: any)  {
    const {community,noInformation } = state;
    const {subjectData,domainData,domainShown} = community;
    return {subjectData, domainData,domainShown,noInformation};
};
export default connect(mapStateToProps, {fetchSubjectData, updateSubjectData, fetchDomainData, updateDomainData,updateDomainShown})(Card);