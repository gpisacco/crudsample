import axios, { AxiosInstance } from 'axios';
import config from '../config';

export default class ContactsAPI {
    static cancelTokens: any;
    axiosClient: AxiosInstance;

    constructor() {
        if (!ContactsAPI.cancelTokens)
            ContactsAPI.cancelTokens = {};
        this.axiosClient = axios.create({
            baseURL: config.contactsApiUrl,
            timeout: 30000

        });
    }

    cancel = (reason = '') => ContactsAPI.cancelTokens.forEach((cancelToken: any) => cancelToken.cancel(reason));

    _create = async (endpoint: string, data: any) => {
        const response = await this.axiosClient.put(`/${endpoint}`, data);
        return response.data;
    }

    _get = async (endpoint: string, id: string) => {
        let requestId = `/${endpoint}`;
        if (id)
            requestId += `/${id}`;
        if (ContactsAPI.cancelTokens[requestId]) {
            ContactsAPI.cancelTokens[requestId].cancel();
        }
        try {
            const source = axios.CancelToken.source();
            ContactsAPI.cancelTokens[requestId] = source;
            const response = await this.axiosClient.get(requestId, { cancelToken: source.token });
            return response.data;
        } finally {
            delete ContactsAPI.cancelTokens[requestId];
        }
    }

    _list = async (endpoint: string, filters: any) => {
        let queryString: string[] = [];
        if (filters) {
            const keys = Object.keys(filters);
            keys.map(key => queryString.push(`${key}=${filters[key]}`));
        }
        const requestId = `/${endpoint}?${queryString.join('&')}`;
        if (ContactsAPI.cancelTokens[requestId]) {
            ContactsAPI.cancelTokens[requestId].cancel();
        }
        try {
            const source = axios.CancelToken.source();
            ContactsAPI.cancelTokens[requestId] = source;
            const response = await this.axiosClient.get(requestId, { cancelToken: source.token });
            return response.data;
        } finally {
            delete ContactsAPI.cancelTokens[requestId];
        }
    }

    _delete = async (endpoint: string, id: string) => {
        const response = await this.axiosClient.delete(`/${endpoint}/${id}`);
        return response.data;
    }


}



