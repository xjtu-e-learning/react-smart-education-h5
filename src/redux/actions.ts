import {
    AssembleData_Fetch_Required,
    Click_Community,
    MapData_Fetch_Required,
    TreeData_Fetch_Required, SubjectData_Fetch_Required,
    DomainData_Fetch_Required,Update_AssembleShown, Update_Shown,
    Update_Topic,
    Update_TopicName,
    Update_TreeData,
    Update_MapData,
    Update_Sequences,
    Update_SubjectData,
    Update_DomainData,
    Update_MapShown,
    Update_DomainShown
} from './actionTypes';
//@ts-ignore
import { Action } from 'redux';
import { MapData } from './reducers/community';

export interface ActionPayload<T> extends Action<string> {
    type: any;
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

export const clickTopic = (topicId: number) => ({
    type: Update_Topic,
    payload: {
        topicId,
    }
});

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
});

export const updateSubjectData = (subjectData:any) => ({
    type: Update_SubjectData,
    payload: {
        subjectData,
    },
});

export const updateDomainData = (domainData:any) => ({
    type: Update_DomainData,
    payload: {
         domainData,
    },
});

export const fetchSubjectData = () => ({
    type: SubjectData_Fetch_Required,
});

export const fetchDomainData = (subjectName: string) => ({
    type: DomainData_Fetch_Required,
    payload: {
        subjectName,
    },
});

export const updateMapShown = () => ({
    type: Update_MapShown,
});
export const updateDomainShown = () => ({
    type: Update_DomainShown,
});
