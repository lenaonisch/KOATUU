import axios, { AxiosResponse } from 'axios';
import { IActivity } from '../models/activity';
import { ILocality } from '../models/locality';

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) => 
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms)
    ) ;

const requests = {
    get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, item: ILocality) => axios.post(url, item).then(sleep(1000)).then(responseBody),
    put: (url: string, item: ILocality) => axios.put(url, item).then(sleep(1000)).then(responseBody),
    delete: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody)
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
}

export default {
    Activities,
    Localities
}