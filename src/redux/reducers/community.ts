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

const initialState: { mapData: MapData } = {
    mapData: {
        topics: {},
        resultRelations: {},
        graph: {},
        topicId2Community: {},
        relationCrossCommunity: [],
        communityRelation: {},
    },
};

export default function (
    state = initialState,
    action: ActionPayload<{ mapData: MapData }>,
) {
    switch (action.type) {
        case Click_Community: {
        }
        case Update_MapData: {
            const { mapData } = action.payload;
            return {
                ...state,
                mapData,
            };
        }
        default:
            return state;
    }
}
