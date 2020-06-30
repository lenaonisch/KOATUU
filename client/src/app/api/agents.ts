import axios, { AxiosResponse } from 'axios';
import { IActivity } from '../models/activity';
import { ILocality } from '../models/locality';

const qs = require('qs');
axios.defaults.baseURL = "http://localhost:5002/api";

const responseBody = (response: AxiosResponse) => response.data;

// const sleep = (ms: number) => (response: AxiosResponse) => 
//     new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms)
//     ) ;

const requests = {
    get: (url: string) => axios.get(url)./*then(sleep(1000)).*/then(responseBody),
    post: (url: string, item: ILocality) => axios.post(url, item)./*then(sleep(1000)).*/then(responseBody),
    put: (url: string, item: ILocality) => axios.put(url, item)./*then(sleep(1000)).*/then(responseBody),
    delete: (url: string) => axios.delete(url)./*then(sleep(1000)).*/then(responseBody),
    getParametrized: (url: string, item: number[]) => axios.get(
        url, 
        {
            params: { locality: item}, 
            paramsSerializer: function(params) {
                return qs.stringify(params, {arrayFormat: 'repeat'})
            }
        }
    ).then(responseBody)
}

const Activities = {
    list: () : Promise<IActivity[]> => requests.get('/activities'),
   // add: (item: IActivity) => requests.post('/activities', item),
  //  edit: (item: IActivity) => requests.put('/activities', item),
   // delete: (id: string) => requests.delete('/activities/'+ id)
}

const Localities = {
    list: () : Promise<ILocality[]> => requests.get('/localities'),
    add: (item: ILocality) => requests.post('/localities', item),
    edit: (item: ILocality) => requests.put('/localities', item),
    delete: (id: number) => requests.delete('/localities/'+ id),
    file: (items: number[]) => requests.getParametrized('http://localhost:5002/export', items)
}

export default {
    Activities,
    Localities
}