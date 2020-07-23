import { request } from './request';

export const subjectAPI = {
    getSubjects: () => {
            return request({           
                url:'http://yotta.xjtushilei.com:8083/subject/getSubjects',
                //headers: { authorization: token },
                method:'GET',
            });
        },
    getDomains: (subjectName: string) => {
        return request({
            url: 'http://yotta.xjtushilei.com:8083/domain/getDomainsBySubject',
            params: {
                subjectName,
            },
            method: 'GET',
        });
    },
};