import {Update_Shown, Update_TopicName, Update_TreeData} from "../actionTypes";

const initialState = {
    topicName: '',
    shown: false,
    treeData: {}
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
        default:
            return state;
    }
}