import { AxiosError } from 'axios';
declare interface TopicAPI {
    getCompleteTopicByTopicName:
        | AxiosError
        | {
        topicId: number;
        topicName: string;
        topicUrl: string;
        domainId: number;
        children: {[p:string]: any}[]
    };
}

declare const topicAPI: TopicAPI;
