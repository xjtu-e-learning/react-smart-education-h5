import React from 'react';
import ReactDOM from 'react-dom';
//import '../SubjectContainer/node_modules/antd/dist/antd.css';
import { Card } from 'antd';
import axios from 'axios';
import { fetchMapData,updateMapData,updateMapShown } from "../../redux/actions";
import { connect } from 'react-redux';
import {updateDomainShown} from "../../redux/actions";
//@ts-ignore
import Paper from '@material-ui/core/Paper/Paper';
//@ts-ignore
import Grid from '@material-ui/core/Grid/Grid';
import Slide from '../../components/Slide';

class CardDomain extends React.Component<any,any>{
    render(){
        // console.log(this.props);
        // console.log('????', this.props.fetchDomainData("计算机科学"));
        const {domain} = this.props;
        // console.log(this.props)
        return (
                <div style={{overflow:'auto'}}>
                < Grid style={{ padding: 1, marginTop: 6, overflow: 'auto', color: "00AA00" }} item xs={12} key={domain.domainId} >
                <Paper style={{ padding: 20, border: 'solid #EEEEEE',overflow:'auto' }} >
                                    <div onClick={()=>{this.props.fetchMapData(this.props.domain.domainName);this.props.updateMapData(this.props.mapData);this.props.updateMapShown(); }}>
                                        {domain.domainName}
                                    </div>
                </Paper>
                </Grid>
                </div>

        );}}
function mapStateToProps(state: any) {
    const { community } = state;
    const { mapData} = community;
  
    return {
        mapData
    };
}
export default connect(mapStateToProps, {fetchMapData,updateMapData,updateMapShown})(CardDomain);