import React from "react";
// @ts-ignore
import { gaozhongshuxue } from '../../module/topicDependenceVisualization';
// @ts-ignore
import {drawCommunity, drawTopic} from '../../module/topicDependenceVisualization';
import {connect} from "react-redux";
import { isEqual } from 'lodash';
import {clickCom, clickTopicName, fetchTreeData, updateShown,fetchIncomData} from "../../redux/actions";

class Home extends React.Component<any, any> {

    render() {
        return (
            
            <div style={{ position: "relative", top: "50%", marginTop: "-50vw" }}>
                <svg id="map" width="100vw" height="100vw">
                </svg>
                <button style={{ position: 'fixed', top: 0, left: 0}} onClick={() => this.props.clickCom(-1)}>
                    {"<-"}
                </button>
            </div>
        );
    }
 
    // shouldComponentUpdate()让react知道当前状态或者属性的改变是否不影响组件的输出，默认返回true,
    // 返回false时不会重写render
    shouldComponentUpdate(nextProps: { comId: any; inCom:any}, nextState: any) {
        if (isEqual(nextProps, this.props)) return false;
        const { comId } = nextProps;
        if (comId === -1) {
            const svg = document.getElementById('map');
            emptyChildren(svg);
            drawCommunity(gaozhongshuxue, svg as HTMLElement, (d: any) => this.props.clickCom(d.id));//clickCom是一个reducer函数，返回被点击的comid
        } else {
            const svg = document.getElementById('map');
            emptyChildren(svg);
            drawTopic(comId, gaozhongshuxue, svg as HTMLElement, (d:any) => {
                this.props.clickTopicName(gaozhongshuxue.topics[d]);
                this.props.fetchTreeData(gaozhongshuxue.topics[d]);
                this.props.updateShown();
            });
        }
        console.log("===========this.props========",this.props);
        return false;
    }

    componentDidMount() {
        const { clickCom } = this.props;
        if (document.getElementById('map') !== null) {
            drawCommunity(gaozhongshuxue, document.getElementById('map') as HTMLElement, (d: any) => clickCom(d.id));
        }
    }
}

function emptyChildren(dom: HTMLElement | null): void {
    if (!dom) return;
    const children = dom.childNodes;
    while (children.length > 0) {
        dom.removeChild(children[0]);
    }
}

const mapStateToProps = (state: any) => {
    const { community } = state;
    const { mapData, comId } = community;
    return { mapData, comId };
};

export default connect(mapStateToProps, {clickCom, clickTopicName, fetchTreeData, updateShown,fetchIncomData})(Home);