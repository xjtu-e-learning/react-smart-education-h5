import { call, put, takeEvery } from 'redux-saga/effects';
import {MapData_Fetch_Required, TreeData_Fetch_Required, Update_MapData, Update_TreeData} from './actionTypes';
import { dependenceAPI } from '../services/dependence';
import { ActionPayload } from './actions';
import {topicAPI} from "../services/topic";

function* fetchMapData(action: ActionPayload<{ domainName: string }>) {
    try {
        const mapData = yield call(
            dependenceAPI.getDependence,
            action.payload.domainName,
        );
        yield put({ type: Update_MapData, payload: { mapData } });
    } catch (e) {
        yield put({ type: Update_MapData, payload: { mapData: e } });
    }
}

function* fetchTreeData(action: ActionPayload<{ topicName: string }>) {
    try {
        const treeData = yield call(
            topicAPI.getCompleteTopicByTopicName,
            action.payload.topicName,
        );
        yield put({ type: Update_TreeData, payload: {treeData}})
    } catch (e) {
        console.log(e);
    }
}

function* mySaga() {
    yield takeEvery(MapData_Fetch_Required, fetchMapData);
    yield takeEvery(TreeData_Fetch_Required, fetchTreeData);
}

export default mySaga;
