import { Click_Community, Update_MapData, Update_Sequences, Update_Topic,Update_SubjectData,Update_DomainData, SubjectData_Fetch_Required,Update_MapShown,Update_DomainShown } from '../actionTypes';
import { ActionPayload } from '../actions';

export interface MapData {
    topics: { [p: string]: string };
    resultRelations: { [p: string]: number[] };
    graph: {
        [p: string]: {
            [p: string]: number[];
        };
    };
    topicId2Community: { [p: string]: number };
    relationCrossCommunity: [number, number][];
    communityRelation: { [p: string]: number[] };
}

const initialState: { mapData: MapData; comId: number, inCom: number[], outCom: number[], sequences: {[p:string]: number[]}, topicId:number,inTopic:number[],outTopic:number[],subjectData:[], domainData:[],mapShown: false,domainShown:false} = {
    mapData: {
        topics: {},
        resultRelations: {},
        graph: {},
        topicId2Community: {},
        relationCrossCommunity: [],
        communityRelation: {},
        
    },

    comId: -1,
    inCom: [],
    outCom: [],
    sequences: {},
    topicId:-1,
    inTopic:[],
    outTopic:[],
    subjectData:[],
    domainData:[],
    mapShown:false,
    domainShown:false
};

export default function (
    state = initialState,
    action: ActionPayload<{ mapData: MapData } | { comId: number} | { sequences: {[p:string]: number[]} }| { topicId:number } | { subjectName:string } | { domainName:string } | { subjectData:[] } | { domainData:[] }>,
) {
    switch (action.type) {
        case Click_Community: {
            const { comId } = action.payload as { comId: number };
            const tmp = [];
            for (let key in state.mapData.communityRelation) {
               
                if (state.mapData.communityRelation[key].indexOf(comId) !== -1) {
                    tmp.push(parseInt(key));
                }
            }
            return {
                ...state,
                comId,
                inCom: tmp,
                outCom: state.mapData.communityRelation[comId] === undefined ? [] : state.mapData.communityRelation[comId],
            }
        }
        case Update_Topic:{
            const  {topicId}  = action.payload as { topicId: number };
            
            const tmp = [];
           
            for (let key in state.mapData.resultRelations) {
                if (state.mapData.resultRelations[key].indexOf(topicId) !== -1) {
                    tmp.push(parseInt(key));
                }
            }
            return {
                ...state,
                topicId,
                inTopic: tmp,
                outTopic:state.mapData.resultRelations[topicId] === undefined ? [] : state.mapData.resultRelations[topicId],
            }
        }
        case Update_MapData: {
            const { mapData } = action.payload as { mapData: MapData };
            return {
                ...state,
                mapData,
            };
        }
        case Update_Sequences: {
            const { sequences } = action.payload as { sequences: {[p:string]: number[]}};
            return {
                ...state,
                sequences,
            };
        }
        case Update_SubjectData: {

            const { subjectData } = action.payload as {subjectData: [] };
            return {
                ...state,
                subjectData,
            };
        }
        case Update_DomainData: {
            const { domainData } = action.payload as {domainData: [] };
            return {
                ...state,
                domainData,
                };
            }
        case Update_MapShown: {
            if (state.mapShown) {
                return {
                    ...state,
                    mapShown: !state.mapShown,
                    mapData: [],
                }
            } else {
                return {
                    ...state,
                    mapShown: !state.mapShown,
                }
            }

        }
        case Update_DomainShown: {
            if (state.domainShown) {
                return {
                    ...state,
                    domainShown: !state.domainShown,
                    domainData: [],
                }
            } else {
                return {
                    ...state,
                    domainShown: !state.domainShown,
                }
            }

        }
        default:
            return state; 
    }
}
