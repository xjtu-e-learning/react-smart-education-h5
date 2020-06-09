import { call, put, takeEvery } from 'redux-saga/effects';
import {
    AssembleData_Fetch_Required,
    MapData_Fetch_Required,
    TreeData_Fetch_Required,
    Update_AssembleData,
    Update_MapData,
    Update_TreeData
} from './actionTypes';
import { dependenceAPI } from '../services/dependence';
import { ActionPayload } from './actions';
import {topicAPI} from "../services/topic";
import {assembleAPI} from "../services/leaf";

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

function* fetchAssembleData(action: ActionPayload<{ facetId: number }>) {
    try {
        const assembleData = yield call(
            assembleAPI.getAssemblesByFacetId,
            action.payload.facetId
        );
        yield put({ type: Update_AssembleData, payload: {assembleData}});
    } catch (e) {
        console.log(e);
    }
}

function* mySaga() {
    yield takeEvery(MapData_Fetch_Required, fetchMapData);
    yield takeEvery(TreeData_Fetch_Required, fetchTreeData);
    yield takeEvery(AssembleData_Fetch_Required, fetchAssembleData);
}

export default mySaga;
