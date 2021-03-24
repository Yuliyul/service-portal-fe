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
import { DomainList } from './domains';
import jsonServerProvider from 'ra-data-json-server';
// import { Login, Layout } from './layout';
import Dashboard from './Dashboard';
import { createMuiTheme } from '@material-ui/core/styles';
const myTheme = createMuiTheme({
    overrides: {
        RaDatagrid: {
            headerCell: {
                fontWeight: 'bold',
            },
        },

        MuiAppBar: {
            colorSecondary: {
                backgroundColor: '#2196f3',
            },
        },
    },
});

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
};

// const dataProvider = jsonServerProvider('http://localhost:3005', httpClient);
const dataProvider = jsonServerProvider(
    'https://service-portal-be.hosting7-p.tn-rechenzentrum1.de',
    httpClient
);
const App = () => (
    <Admin
        authProvider={authProvider}
        dataProvider={dataProvider}
        Dashboard={Dashboard}
        theme={myTheme}
    >
        <Resource
            name="kasses"
            list={KassList}
            show={KassShow}
            edit={EditGuesser}
        />
        <Resource name="domains" list={DomainList} />
    </Admin>
);

export default App;
