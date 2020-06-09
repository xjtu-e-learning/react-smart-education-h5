import { MapData_Fetch_Required } from './actionTypes';
import { Action } from 'redux';

export interface ActionPayload<T> extends Action<string> {
    payload: T;
}

export const fetchMapData = (domainName: string) => ({
    type: MapData_Fetch_Required,
    payload: {
        domainName,
    },
});
