import React from 'react';
import { connect } from 'react-redux';
import { fetchMapData } from '../redux/actions';
import { MapData } from '../redux/reducers/community';

interface ITestButtonProps {
    fetchMapData: Function;
    mapData: MapData;
}

class TestButton extends React.Component<ITestButtonProps> {
    fetchMapData = () => {
        this.props.fetchMapData('数据结构');
    };

    render() {
        return (
            <>
                <button onClick={this.fetchMapData}> click </button>
                <div>{JSON.stringify(this.props.mapData)}</div>
            </>
        );
    }
}

const mapStateToProps = (state: any) => {
    const { community } = state;
    const { mapData } = community;
    return { mapData };
};

export default connect(mapStateToProps, { fetchMapData })(TestButton);
