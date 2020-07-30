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
      <div>
        
      <Menu onClick={this.handleClick.bind(this)} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="0" icon={<CopyrightCircleTwoTone /> }>
          中文学科
        </Menu.Item>
        <Menu.Item key="1" icon={<Html5TwoTone />}>
          英文学科
        </Menu.Item>
        <Menu.Item key="alipay">
          <a href="https://www.baidu.com" target="_blank" rel="noopener noreferrer">
            Navigation Link
          </a>
        </Menu.Item>
      </Menu>
      <div>
        {showMain(current)}
        </div>
      </div>
    );
    
  }
}
const mapStateToProps = (state: any) => {
  const { current ,community} = state;
  const {domainData} = community;
  return {current, domainData};
  
}
export default connect(mapStateToProps, {fetchDomainData,updateDomainData})(Menumy);