import { request } from './request';

export const dependenceAPI = {
    getDependence: (domainName: string) => {
        return request({
           url: 'http://47.95.145.72:80/dependences/',
        //    url: 'http://10.181.225.141:8000/dependences/',
        // url:'http://10.181.225.141:8000/',
            params: {
                domainName,
            },
            method: 'GET',
        });
    },
};
