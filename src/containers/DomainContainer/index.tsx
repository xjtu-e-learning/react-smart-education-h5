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

class Card extends React.Component<any, any> {
    state = {
        noInformation: true,
      };
    change = () => {
        this.setState( {noInformation: false} )
      }
    render() {
       
         console.log(this.props);
        // console.log('????', this.props.fetchDomainData("计算机科学"));
        const Title=Typography.Title;
        const {domainShown,updateDomainShown} = this.props;
        return (
            
            <Slide direction={"right"} offset={1} shown={domainShown} closeFunc={updateDomainShown}>
               
               
                <div id="root" style={{overflow:'auto'}} >
                    {/* <button style={{ position: 'fixed', top: 100, right: 0}} onClick={() => this.props.fetchDomainData("计算机科学")}>
                            {"x"}
                    </button> */}
                    <div className="title" style={{ position: "relative", top: 30,width:"100%",height:40,padding:0}}>                     
                    <Title level={3}
                    style={{textAlign:"center",padding:0}}
                    >
                    <AppstoreOutlined /> 课程列表
                    </Title>
                </div>
                
               {
                    
                <div style={{overflow:'auto',position:"relative",top: 30,}}>
                    {
                        this.props.domainData.map((domain: {domainId:number;domainName:string;subjectId:number}) =>
                            <CardDomain domain={domain } key={domain.domainId} />)   
                    }     
                </div>
                }
                </div>
               
            </Slide>
            
        );
    }
    componentDidMount() {  
        console.log("這是domaindata"); 
        if (isEmpty(this.props.domainData)) 
        {
            this.change();
            console.log("没有数据");

        }
       else{
        console.log("有数据");
    }}
  
}

function mapStateToProps(state: any)  {
    const {community,noInformation } = state;
    const {subjectData,domainData,domainShown} = community;
    return {subjectData, domainData,domainShown,noInformation};
};
export default connect(mapStateToProps, {fetchSubjectData, updateSubjectData, fetchDomainData, updateDomainData,updateDomainShown})(Card);