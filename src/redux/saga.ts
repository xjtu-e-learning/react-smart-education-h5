import { call, put, takeEvery } from 'redux-saga/effects';
import { MapData_Fetch_Required, Update_MapData } from './actionTypes';
import { dependenceAPI } from '../services/dependence';
import { ActionPayload } from './actions';

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

function* mySaga() {
    yield takeEvery(MapData_Fetch_Required, fetchMapData);
}

export default mySaga;
