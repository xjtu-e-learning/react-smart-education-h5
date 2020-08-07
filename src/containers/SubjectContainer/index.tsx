import React,{ useState } from 'react';
import { Menu } from 'antd';
import {Html5TwoTone ,CopyrightCircleTwoTone} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { createFromIconfontCN } from '@ant-design/icons';

import {fetchDomainData, updateDomainData} from "../../redux/actions";
import { connect } from 'react-redux';
import ChineseSubject from './ChineseSubject';
import EnglishSubject from './EnglishSubject';
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1963357_igv0o6q1wca.js',
  });

function showMain(idx: {} | null | undefined){
  switch (idx) {
    case "0":
      return <ChineseSubject></ChineseSubject>
      break;
    case "1":
      return <EnglishSubject></EnglishSubject>
      break;
    default:
      break;
  }
}

class Menumy extends React.Component {
  state = {
    current: '0'
  };

  
  handleClick =(selectedKey: any)=>{
    console.log(selectedKey);
    this.setState({
     current: selectedKey.key
    });
  }


  render() {
    const { current } = this.state;
    //let current = this.state.current;
    
    

    return (
      <div id="subject">
        
      <Menu style={{textAlign:"center",padding:0}}onClick={this.handleClick.bind(this)} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="0" icon={<CopyrightCircleTwoTone /> }>
          中文学科
        </Menu.Item>
        <Menu.Item key="1" icon={<Html5TwoTone />}>
          英文学科
        </Menu.Item>
      </Menu>
      <div>
        {showMain(current)}
        </div>
      </div>
    );

  }

//   componentDidMount() {  
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
    
// }}
}


const mapStateToProps = (state: any) => {
  const { current ,community} = state;
  const {domainData} = community;
  return {current, domainData};
  
}
export default connect(mapStateToProps, {fetchDomainData,updateDomainData})(Menumy);