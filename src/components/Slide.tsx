import React from 'react';
import styled from 'styled-components';

interface IProps {
    direction: 'right' | 'bottom';
    offset: number;
    shown: boolean;
    closeFunc: () => void;
}

class Slide extends React.Component<IProps, any> {
    render() {
        // this.props.children 代表组件的所有子节点
        const {shown, children, direction, offset} = this.props;
        console.log("props in slides",this.props)
        let StyledDiv;
        if (direction === 'right') {
            StyledDiv = styled.div`
                position: fixed;
                background-color: #ffffff;
                top: 0;
                height: 100vh;
                width: ${offset*100 + 'vw'};
                transition-property: right;
                transition-duration: 2s;
                overflow: auto;
                right: ${shown ? 0 : '-100%'};
            `
        } else {
            StyledDiv = styled.div`
                position: fixed;
                background-color: #ffffff;
                left: 0;
                height: ${offset*100 + 'vh'};
                width: 100vw;
                transition-property: bottom;
                transition-duration: 2s;
                overflow: auto;
                bottom: ${shown ? 0 : '-100%'};
            `
        }

        return (
            <StyledDiv>
                <button style={{ position: 'static', top: 0, right: 0}} onClick={() => this.props.closeFunc()}>
                    {"x"}
                </button>
                {children}
            </StyledDiv>
        );
    }
}

export default Slide;