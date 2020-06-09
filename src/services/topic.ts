import { request } from './request';

export const topicAPI = {
    getCompleteTopicByTopicName: (topicName: string) => {
        return request({
            url:
                'http://yotta.xjtushilei.com:8083/topic/getCompleteTopicByTopicName',
            params: {
                topicName,
                hasFragment: 'emptyAssembleContent'
            },
        });
    },
};
