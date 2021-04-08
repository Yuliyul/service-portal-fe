import { fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
};
const dataProvider = jsonServerProvider(
    process.env.REACT_APP_SERVER,
    httpClient
);
// export default jsonServerProvider(process.env.REACT_APP_SERVER, httpClient);
export default (type, resource, params) => {
    return dataProvider(type, resource, params);
};
