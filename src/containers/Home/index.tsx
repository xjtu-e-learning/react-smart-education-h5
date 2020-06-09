import React from "react";
import { gaozhongshuxue } from 'topic-dependence-visualization/gaozhongshuxue';
import {drawCommunity} from 'topic-dependence-visualization/src';

class Home extends React.Component<any, any> {
    render() {
        return (
            <div style={{ position: "relative", top: "50%", marginTop: "-50vw" }}>
                <svg id="map" width="100vw" height="100vw">
                </svg>
            </div>
        );
    }
    componentDidMount() {
        if (document.getElementById('map') !== null) {
            drawCommunity(gaozhongshuxue, document.getElementById('map') as HTMLElement, () => {});
        }
    }
}

export default Home;