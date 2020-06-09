import {
    Update_AssembleData,
    Update_AssembleShown,
    Update_Shown,
    Update_TopicName,
    Update_TreeData
} from "../actionTypes";

const initialState = {
    topicName: '',
    shown: false,
    treeData: {},
    assembleShown: false,
    assembleData: [],
}

export default function (state = initialState, action: any) {
    switch (action.type) {
        case Update_TopicName: {
            return {
                ...state,
                topicName: action.payload.topicName
            }
        }
        case Update_TreeData: {
            return {
                ...state,
                treeData: action.payload.treeData,
            }
        }
        case Update_Shown: {
            return {
                ...state,
                shown: !state.shown,
            }
        }
        case Update_AssembleData: {
            return {
                ...state,
                assembleData: action.payload.assembleData,
            }
        }
        case Update_AssembleShown: {
            if (state.assembleShown) {
                return {
                    ...state,
                    assembleShown: !state.assembleShown,
                    assembleData: [],
                }
            } else {
                return {
                    ...state,
                    assembleShown: !state.assembleShown,
                }
            }

        }
        default:
            return state;
    }
}