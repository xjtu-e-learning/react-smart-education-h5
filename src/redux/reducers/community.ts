
import { Click_Community, Update_MapData, Update_Sequences, Update_Topic,Update_SubjectData,Update_DomainData, SubjectData_Fetch_Required,Update_MapShown,Update_DomainShown, Update_AlertShown } from '../actionTypes';
import { ActionPayload } from '../actions';
import { domain } from 'process';

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

const initialState: { mapData: MapData; comId: number, inCom: number[], outCom: number[], sequences: {[p:string]: number[]}, topicId:number,inTopic:number[],outTopic:number[],subjectData:[], domainData:[],mapShown: false,domainShown:false,alertShown:true} = {
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
    domainShown:false,
    alertShown:true,
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
           // console.log("state.mapData",state.mapData);
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
        case Update_AlertShown: {
            
                return {
                    ...state,
                    alertShown: !state.alertShown,
                }
           
        }
        case Update_MapData: {
            const { mapData } = action.payload as { mapData: MapData };
            
            return {
                ...state,
                mapData,
                alertShown: !state.alertShown,
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
            //@ts-ignore
            //console.log((['张三','李四','王五'].sort((a,b) => a.localeCompare(b,'zh-Hans-CN',{sensitivity:'accent'}) )))
            domainData.sort(compare('domainName'))
            for(var i=0;i<domainData.length;i++){
                if(domainData[i]['domainName'] === '人机交互'||domainData[i]['domainName'] === '七年级语文' || domainData[i]['domainName'] === '七年级生物' || domainData[i]['domainName'] === '九年级语文' 
                || domainData[i]['domainName'] === '软件工程（自动构建）' || domainData[i]['domainName'] === '中医' || domainData[i]['domainName'] === '生理学' 
                || domainData[i]['domainName'] === '药理学' || domainData[i]['domainName'] === '八年级数学' || domainData[i]['domainName'] === '群体遗传学' 
                || domainData[i]['domainName'] === '七年级历史' || domainData[i]['domainName'] === '九年级历史' || domainData[i]['domainName'] === '七年级地理' 
                || domainData[i]['domainName'] === '八年级地理' || domainData[i]['domainName'] === '七年级政治' || domainData[i]['domainName'] === '八年级政治' 
                || domainData[i]['domainName'] === '九年级政治' || domainData[i]['domainName'] === '初中信息技术' || domainData[i]['domainName'] === '七年级英语' 
                || domainData[i]['domainName'] === '九年级英语' || domainData[i]['domainName'] === '分子生物学' || domainData[i]['domainName'] === '自然保育'
                || domainData[i]['domainName'] === '细胞生物学' || domainData[i]['domainName'] === '解剖学' || domainData[i]['domainName'] === '微生物学' 
                || domainData[i]['domainName'] === '神经生理学' || domainData[i]['domainName'] === '生物工程' || domainData[i]['domainName'] === '细胞解剖学' 
                || domainData[i]['domainName'] === '高三英语' || domainData[i]['domainName'] === '高一物理' || domainData[i]['domainName'] === '统计力学' 
                || domainData[i]['domainName'] === '拓扑学' || domainData[i]['domainName'] === '几何形状' || domainData[i]['domainName'] === '数学分析'
                || domainData[i]['domainName'] === '电子商务' || domainData[i]['domainName'] === '会计学' || domainData[i]['domainName'] === '微观经济学' 
                || domainData[i]['domainName'] === '测试课程'
                || domainData[i]['domainName'] === '中国经济史' || domainData[i]['domainName'] === '中年级（3-4）英语' || domainData[i]['domainName'] === '五年级科学'
                || domainData[i]['domainName'] === 'History_of_computer_science' || domainData[i]['domainName'] === 'Java_(programming_language)' || domainData[i]['domainName'] === '软件工程(自动构建)'
                 ){
                    //@ts-ignore
                   domainData[i]['shown'] = false;
                   console.log(domainData[i])
                }
                else{
                    //@ts-ignore
                    domainData[i]['shown'] = true;
                }
            }
            //@ts-ignore
            // for ( var domain of domainData){
            //     console.log("reducers...............",domain);
            //     if(domain['domainName'] === '七年级语文' ){
            
            //        //@ts-ignore
            //        domain['shown'] = false;
            //        console.log(domain)
            //     }
            //     else{
            //          //@ts-ignore
            //         domain['shown'] = true;
            //     }
            // }
            if(state.domainShown){ 
                return {
                 ...state,
                 domainData,
                 }
             }else{
                 return {
                     ...state,
                     domainData,
                     domainShown: !state.domainShown,
                 }
             }
            // return {
            //     ...state,
            //     domainData,
            //     };
            //
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
            return {
                         ...state,
                        domainShown: !state.domainShown,
            }
            // if (state.domainShown) {
            //     return {
            //         ...state,
            //         domainShown: !state.domainShown,
            //         domainData: [],
            //     }
            // } else {
            //     return {
            //         ...state,
            //         domainShown: !state.domainShown,
            //     }
            // }

        }

        
        default:
            return state; 
    }
}

function compare(property){
    return function(a,b){
        var value1 = a[property]
        var value2 = b[property]
        return value1.localeCompare(value2,'zh-Hans-CN',{sensitivity:'accent'})
    }
}
