import {
    AssembleData_Fetch_Required,
    Click_Community,
    MapData_Fetch_Required,
    TreeData_Fetch_Required, Update_AssembleShown, Update_Shown,
    Update_TopicName,
    Update_TreeData,
    Update_MapData,
    Update_Sequences,
} from './actionTypes';
import { Action } from 'redux';
import { MapData } from './reducers/community';

export interface ActionPayload<T> extends Action<string> {
    payload: T;
}

export const updateMapData = (mapData: MapData) => ({
    type: Update_MapData,
    payload: {
        mapData,
    },
});

export const fetchMapData = (domainName: string) => ({
    type: MapData_Fetch_Required,
    payload: {
        domainName,
    },
});

export const clickCom = (comId: number) => {
    return {
        type: Click_Community,
        payload: {
            comId,
        },
    }
};

export const clickTopicName = (topicName: string) => ({
    type: Update_TopicName,
    payload: {
        topicName,
    }
});

export const updateTreeData = (treeData: any) => ({
    type: Update_TreeData,
    payload: {
        treeData,
    }
});

export const fetchTreeData = (topicName: string) => ({
    type: TreeData_Fetch_Required,
    payload: {
        topicName,
    }
});

export const updateShown = () => ({
    type: Update_Shown,
});

export const updateAssembleShown = () => ({
    type: Update_AssembleShown,
});

export const fetchAssembleData = (facetId: number) => ({
    type: AssembleData_Fetch_Required,
    payload: {
        facetId,
    },
});

export const updateSequences = (sequences: {[p:string]: number[]}) => ({
    type: Update_Sequences,
    payload: {
        sequences,
    }
})