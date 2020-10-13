import { connect } from 'react-redux';
import React from 'react'
import { createFromIconfontCN } from '@ant-design/icons';
//@ts-ignore
import classes from './index.module.css';
import { updateDomainData,fetchDomainData,updateDomainShown } from "../../redux/actions";
import { isEmpty } from 'lodash';
import { Alert } from 'antd';
const IconFont = createFromIconfontCN({
  scriptUrl: 'https://at.alicdn.com/t/font_1963357_igv0o6q1wca.js',
});

class ChineseSubject extends React.Component {
  render(){
     // @ts-ignore
    const {domainData} = this.props;
   // console.log("学科页的props",this.props);
    const line1: string[][] = [['icon-jisuanji','计算机科学'], ['icon-huaxue-','化学'],['icon-yixue','医学'],['icon-biaozhun','示范课程'],['icon-shaonian','初中课程']];
    const line2: string[][] = [['icon-wuli','物理'], ['icon-huabanfuben','生物学'],['icon-falv','法律'],['icon-chengren','高中课程'],['icon-ren','人工构建']];
    const line3: string[][]= [['icon-shuxue','数学'],['icon-ceshi','测试'],['icon-tubiao-','经济学'],['icon-xuesheng','小学课程']];
    //const line3: string[][]= [['icon-shuxue','数学'],['icon-ceshi','测试'] ['icon-tubiaozhizuomoban','地理学'],['icon-tubiao-','经济学'],['icon-xuesheng','小学课程'],['icon-ren','人工构建']];
    return (
      
      <div className={classes.wrapper}>
        <div className={classes.line1}>
          {
            line1.map((item) => (
              <div className={classes.courseWrapper}>
                <IconFont type={item[0]} className={classes['icon-font']} 
                // @ts-ignore 
                onClick={() =>  {this.props.fetchDomainData(item[1]);
                //this.props.updateDomainShown();
              }}></IconFont>
                <span id="subject" className={classes.courseTitle} // @ts-ignore
                 onClick={() =>  {this.props.fetchDomainData(item[1]);
                 //this.props.updateDomainShown();
                }}>{item[1]}</span>
              </div>
              
            ))
            
          }
          
        </div>
        <div className={classes.line2}>
        {
            line2.map(item => (
              <div className={classes.courseWrapper}>
                <IconFont type={item[0]} className={classes['icon-font']}// @ts-ignore 
                onClick={() =>  {this.props.fetchDomainData(item[1])
                  //;this.props.updateDomainShown();
               }}></IconFont>
                <span id="subject" className={classes.courseTitle} // @ts-ignore
                 onClick={() =>  {this.props.fetchDomainData(item[1]);
                  //this.props.updateDomainShown();
                }}>{item[1]}</span>
              
              </div>
            ))
          }
          
        </div>
        <div className={classes.line3}>
        {
            line3.map(item => (
              <div className={classes.courseWrapper}>
                <IconFont type={item[0]} className={classes['icon-font']}// @ts-ignore 
                onClick={() =>  {this.props.fetchDomainData(item[1]);
                //this.props.updateDomainShown();
                }}></IconFont>
                <span id="subject" className={classes.courseTitle} // @ts-ignore
                 onClick={() =>  {this.props.fetchDomainData(item[1]);
                 //this.props.updateDomainShown();
                }}>{item[1]}</span>
              </div>
            ))
          }
        </div>
        
      </div>
    );
  }
//     componentDidMount() {  
//     var startx, starty, endx, endy;
//     let direction1;
//     let that = this;
//     var tree1 = document.getElementById('root');
//    // var slide1 = document.getElementById('Slide');
//    tree1.addEventListener("touchstart",function(e){
//         var touch =e.touches[0];//第一根手指
//             startx = touch.pageX;
//             starty = touch.pageY;
//     })
//     tree1.addEventListener("touchmove",function(e){
//             var touch =e.touches[0];//第一根手指
//             endx = touch.pageX;
//             endy = touch.pageY;
//             e.preventDefault();
//     })
//     tree1.addEventListener("touchend",function(e){ //区分四个方向
//            // console.log(this.props);
//             var clientx = endx - startx; 
//             var clienty = endy - starty;
//             if (Math.abs(clientx) > Math.abs(clienty) && clientx > 0 && clienty>0) { 
//                 direction1="right";
//                 that.handleClick.bind(that);
//             }
//             else if (Math.abs(clientx) > Math.abs(clienty) && clientx < -document.body.clientWidth/2) {
//                 direction1="left";
//                 that.handleClick.bind(that);
//             }
//             else if (Math.abs(clientx) < Math.abs(clienty) && clienty > document.body.clientHeight/2) {
//                 direction1="down";
//             }
//             else if (Math.abs(clientx) < Math.abs(clienty) && clienty < -document.body.clientHeight/2) {
//                 direction1="up";
//             }
//            // console.log(direction1)
//     })
    
// }
  }

function mapStateToProps(state: any) {
    const { community } = state;
    const { domainData} = community;
  
    return {
        domainData
    };
}
export default connect(mapStateToProps, {fetchDomainData,updateDomainData,updateDomainShown})(ChineseSubject);