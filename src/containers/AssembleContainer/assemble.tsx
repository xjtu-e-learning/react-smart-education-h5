import React from 'react';



// @ts-ignore
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';
import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import { connect } from 'react-redux';
import { updateAssembleShown,updateDomainShown,updateMapShown,updateShown,updatAlertShown,clickCom} from "../../redux/actions";
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import {Alert} from 'antd';
interface ILeafProps {
  assemble: {
    assembleId: number;
    assembleContent: string;
    assembleScratchTime: string;
    facetId: number;
    sourceId: number;
    domainId: number;
    type: string;
  }
}

const StyledBadge = withStyles((theme) => ({
  anchorOriginTopRightRectangle: {
    top: 0,
    right: 0,
    transform: 'scale(1) translate(150%, 50%)',
    transformOrigin: '100% 0%',
    '&$invisible': {
      transform: 'scale(0) translate(50%, -50%)'
    }
  },
}))(Badge);

class Assemble extends React.Component<any, any> {

  myclose=()=>{
    this.props.updateAssembleShown();
    this.props.updateShown();
    this.props.clickCom(-1);
    this.props.updateMapShown();
    this.props.updatAlertShown(this.props.alertShown);
    this.props.updateDomainShown();  
    // this.props.updataDomainShown() ;
  }
  state = {
    showDetail: false,
  };
  handleClick = () =>{
    this.setState({showDetail:!this.state.showDetail})
  }
  
  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

    const {assemble, textCount} = this.props;
    console.log("assemble页面",this.props)
    var ordered_assembleContent
    var reg=RegExp(/<img.*?>/g);
    var reg2=RegExp(/<pre.*?>/g);
    var reg3=RegExp(/<\/pre/g)
    var imgs,tmp;
    if(this.props.abnormal===undefined)
    {
      imgs=assemble.assembleContent.match(reg);
      //console.log("yiha",imgs)   
      if(!(assemble.assembleContent.match("<pre")))
      {
        ordered_assembleContent=assemble.assembleContent;
      //console.log("ordered_assembleContent",ordered_assembleContent)
      }
      else{
        ordered_assembleContent=assemble.assembleContent.replace(reg2,"<p>");
        ordered_assembleContent=ordered_assembleContent.replace(reg3,"</p")
      }
      if(imgs!=null)
      {
        var reg1=RegExp(/alt="[a-zA-Z0-9_\+{}()-/\\= ]+"/g)
        for(var i=0; i<imgs.length; i++){
          if(!imgs[i].match(reg1)){tmp=imgs[i];
          //console.log(tmp);
          tmp=tmp.replace("<img","<img width=\"100%\" style=\"width:100%;\"");
          ordered_assembleContent=ordered_assembleContent.replace(imgs[i],tmp)}
        }
      }
      
     


      return (
      
      <div>
        
        {/* <button onClick={() => this.myclose()}> "-" </button> */}
        < Grid style={{ padding: 1, marginTop: 6, overflow: 'auto', color: "00AA00" }} 
        item xs={12} key={assemble.assembleId} >
          <Paper style={{ padding: 20, border: 'solid #EEEEEE' ,position:"relative"}} >
            <div style={{ padding: 5,width:"20%",float:"left",height:"auto",position:"absolute",top:0,bottom:0,}}>
                
                {textCount===1?
                    (<StyledBadge  badgeContent={textCount} color="secondary" > 
                    </StyledBadge>):
                    (<StyledBadge badgeContent={textCount} color="primary" > 
                    </StyledBadge>)
                }  
            </div>
            <div>
                <div style={{ padding: 5 ,height:"auto",width:"80%",marginLeft:"auto"}} onClick={this.handleClick} >
                  {
                  this.state.showDetail?
                  (
                    <div id='assembleContent' dangerouslySetInnerHTML={{ __html: ordered_assembleContent }} />
                  ):
                  (
                    <HTMLEllipsis
                    unsafeHTML={ordered_assembleContent}
                    maxLine="3"
                    ellipsisHTML="<a>...查看更多</a>"
                    basedOn="letters"
                    winWidth="100%"
                 />
                  )
                }
            </div>
          
            </div>
          </Paper>
        </Grid >
      </div>
    )}
    else{
      
      return(
        <div  style={{ position: "relative", top: "50%", marginTop: "-50vw" }}>
        <Alert 
        message="智慧教育系统"
        description="这个分支没有内容..."
        type="warning"
        showIcon
        closable
        onClose={this.props.updateAssembleShown}
        />
        </div>
      )
    }
  }
  componentDidMount() {
    var startx, starty, endx, endy;
    let direction1;
    let that = this;
   var tree1 = document.getElementById('assemble');
   // var slide1 = document.getElementById('Slide');
  
   tree1.addEventListener("touchstart",function(e){
        var touch =e.touches[0];//第一根手指
            startx = touch.pageX;
            starty = touch.pageY;
    })
    tree1.addEventListener("touchmove",function(e){
            var touch =e.touches[0];//第一根手指
            endx = touch.pageX;
            endy = touch.pageY;
            //e.preventDefault();
    })
    tree1.addEventListener("touchend",function(e){ //区分四个方向
           // console.log(this.props);
            var clientx = endx - startx; 
            var clienty = endy - starty;
            if (Math.abs(clientx) > Math.abs(clienty) && clientx > 0 && clienty>0) { 
                direction1="right";
                if(that.props.textCount===1||that.props.abnormal!==undefined)
                {that.props.updateAssembleShown(false);}
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
            console.log(direction1)
            
    })

    /*var imgs = document.getElementsByTagName("img");
    //var contentLeft = document.getElementById("assembleContent");
    console.log("imgs",imgs);
    console.log(imgs.length)
    for(var i=0; i<imgs.length; i++){
        console.log(imgs[i]);
        imgs[i].width = 200 ;
        imgs[i].style['width'] = 200 + 'px';
        console.log(imgs[i].width)
        //this.ordered_assembleContent=ordered_assembleContent.replace(tmp,imgs[i]);
    }*/
  }
       
    
       
    
    
     
 
}
const mapStateToProps = (state: any) => {
  const { tree } = state;
  const { treeData } = tree;
  return { treeData };
};

export default connect(mapStateToProps, {updateAssembleShown,updateDomainShown,updateMapShown,updateShown,updatAlertShown,clickCom})(Assemble);
//export default Assemble;
