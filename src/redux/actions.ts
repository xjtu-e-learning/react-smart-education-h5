import { MapData } from './reducers/community';
import {
    AssembleData_Fetch_Required,
    Click_Community,
    MapData_Fetch_Required,
    TreeData_Fetch_Required, Update_AssembleShown, Update_Shown,
    Update_TopicName,
    Update_TreeData,
    Incom_Fetch_Required,
    //SubjectData_Fetch_Required,
    DomainData_Fetch_Required,
    Update_DomainData,
} from './actionTypes';
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

export const clickCom = (comId: number) => ({
    type: Click_Community,
    payload: {
        comId,
    },
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

export const fetchIncomData = (mapData:MapData,comId:number)=>({
    type: Incom_Fetch_Required,
    payload:{
        mapData,
        comId,
    }
});

//export const fetchSubjectData = (mapData:MapData,comId:number)=>({
  //  type: SubjectData_Fetch_Required,
  //  payload:{
        
  //  }
//});

export const fetchDomainData = (subjectName:string)=>({
    type:DomainData_Fetch_Required,
    payload:{
        subjectName
    }
})

export const updateDomainData = (domainData: any) => ({
    type: Update_DomainData,
    payload: {
        domainData
    }
});