import * as React from 'react';
import {
    Admin,
    Resource,
    ListGuesser,
    fetchUtils,
    EditGuesser,
} from 'react-admin';
import authProvider from './authProvider';
// import simpleRestProvider from 'ra-data-simple-rest';
import { KassList, KassShow } from './kasses';
import jsonServerProvider from 'ra-data-json-server';
// import { Login, Layout } from './layout';
import Dashboard from './Dashboard';
const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
};

const dataProvider = jsonServerProvider('http://localhost:3005', httpClient);
const App = () => (
    <Admin
        authProvider={authProvider}
        dataProvider={dataProvider}
        Dashboard={Dashboard}
    >
        <Resource
            name="kasses"
            list={KassList}
            show={KassShow}
            edit={EditGuesser}
        />
    </Admin>
);

export default App;
