import { Click_Community, Update_MapData } from '../actionTypes';
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

const initialState: { mapData: MapData; comId: number } = {
    mapData: {
        topics: {},
        resultRelations: {},
        graph: {},
        topicId2Community: {},
        relationCrossCommunity: [],
        communityRelation: {},
    },
    comId: -1,
};

export default function (
    state = initialState,
    action: ActionPayload<{ mapData: MapData } | { comId: number}>,
) {
    switch (action.type) {
        case Click_Community: {
            const { comId } = action.payload as { comId: number };
            return {
                ...state,
                comId,
            }
        }
        case Update_MapData: {
            const { mapData } = action.payload as { mapData: MapData };
            return {
                ...state,
                mapData,
            };
        }
        default:
            return state;
    }
}
