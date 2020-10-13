

// @ts-ignore
import { call, put, takeEvery } from 'redux-saga/effects';
import {
    AssembleData_Fetch_Required,
    MapData_Fetch_Required,
    TreeData_Fetch_Required,
    SubjectData_Fetch_Required,
    DomainData_Fetch_Required,
    Update_AssembleData,
    Update_MapData,
    Update_TreeData,
    Update_SubjectData,
    Update_DomainData,
   
    
} from './actionTypes';
import { dependenceAPI } from '../services/dependence';
import { ActionPayload } from './actions';
import {topicAPI} from "../services/topic";
import {assembleAPI} from "../services/leaf";
import {subjectAPI} from '../services/subject';

function* fetchSubjectData() {
    try {
        const subjectData = yield call(
            subjectAPI.getSubjects,
        );
        yield put({ type: Update_SubjectData, payload: { subjectData } });
    } catch (e) {
        yield put({ type: Update_SubjectData, payload: {subjectData: e} });
    }
}

function* fetchDomainData(action: ActionPayload<{ subjectName: string }>) {
    try {
        const domainData = yield call(
            subjectAPI.getDomains,
            action.payload.subjectName,
        );
        yield put({ type: Update_DomainData, payload: { domainData } });
    } catch (e) {
        yield put({ type: Update_DomainData, payload: {domainData: e} });
    }
}



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
    yield takeEvery(SubjectData_Fetch_Required, fetchSubjectData);
    yield takeEvery(DomainData_Fetch_Required, fetchDomainData);
}

export default mySaga;
