import { Click_Community, Update_MapData, Update_Sequences } from '../actionTypes';
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

const initialState: { mapData: MapData; comId: number, inCom: number[], outCom: number[], sequences: {[p:string]: number[]} } = {
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
    sequences: {}
};

export default function (
    state = initialState,
    action: ActionPayload<{ mapData: MapData } | { comId: number} | { sequences: {[p:string]: number[]} }>,
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
        default:
            return state;
    }
}
