import React from 'react';
import ReactDOM from 'react-dom';
//import '../SubjectContainer/node_modules/antd/dist/antd.css';
import { Card } from 'antd';
import axios from 'axios';
import { fetchMapData,updateMapShown } from "../../redux/actions";
import { connect } from 'react-redux';

//@ts-ignore
import Paper from '@material-ui/core/Paper/Paper';
//@ts-ignore
import Grid from '@material-ui/core/Grid/Grid';


class CardDomain extends React.Component<any,any>{
    render(){
        
        const {domain} = this.props;
        
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

        );}

}
function mapStateToProps(state: any) {
    const { community } = state;
    // const { mapData} = community;
  
    // return {
    //     mapData
    // };
}
export default connect(mapStateToProps, {fetchMapData,updateMapShown})(CardDomain);