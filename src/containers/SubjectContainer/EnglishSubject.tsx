import React from 'react'
import { createFromIconfontCN } from '@ant-design/icons';
//@ts-ignore
import classes from './index.module.css';
import { updateDomainData,fetchDomainData,updateDomainShown} from "../../redux/actions";
import { connect } from 'react-redux';;
const IconFont = createFromIconfontCN({
  scriptUrl: 'https://at.alicdn.com/t/font_1963357_igv0o6q1wca.js',
});

class EnglishSubject extends React.Component {
  // handleClick = (e:any) =>{
  //  //@ts-ignore
  //   this.props.updateDomainShown(); 
  //   //@ts-ignore
  //   this.props.fetchDomainData(e)
  // }
  render(){
    // @ts-ignore
    const {domainData} = this.props;
    console.log("英语学科页的props",this.props);
    const line1: string[][] = [['icon-jisuanji','Computer_science'], ['icon-huaxue-','Chemistry'],];
    const line2: string[][] = [['icon-wuli','Physics'], ['icon-huabanfuben','Biology']];
    const line3: string[][]= [['icon-shuxue','Mathmatics'],['icon-yixue','Medicine']]
    return (
      <div className={classes.wrapper}>
        <div className={classes.line1}>
          {
            line1.map((item) => (
              <div className={classes.courseWrapper}>
                <IconFont type={item[0]} className={classes['icon-font']}// @ts-ignore 
                onClick={() =>   {this.props.fetchDomainData(item[1]); //this.props.updateDomainShown();
                }}></IconFont>
                <span id="subject" className={classes.courseTitle} // @ts-ignore
                 onClick={() =>   {this.props.fetchDomainData(item[1]); //this.props.updateDomainShown();
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
                onClick={() =>  {this.props.fetchDomainData(item[1]); 
                //this.props.updateDomainShown();
              }}></IconFont>
                <span id="subject" className={classes.courseTitle} // @ts-ignore
                 onClick={() => {this.props.fetchDomainData(item[1]);
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
                 onClick={() =>   {this.props.fetchDomainData(item[1]);
                 // this.props.updateDomainShown();
                }}>{item[1]}</span>
              </div>
            ))
          }
        </div>
        
      </div>
    );
  }}
function mapStateToProps(state: any) {
    const { community } = state;
    const { domainData} = community;
  
    return {
        domainData
    };
}
export default connect(mapStateToProps, {fetchDomainData,updateDomainData,updateDomainShown})(EnglishSubject);
