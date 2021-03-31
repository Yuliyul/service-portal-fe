import * as React from 'react';
import {
    Admin,
    Resource,
    fetchUtils,
    EditGuesser,
    resolveBrowserLocale,
} from 'react-admin';
import authProvider from './authProvider';
// import simpleRestProvider from 'ra-data-simple-rest';
import { KassList, KassShow } from './kasses';
import { DomainList } from './domains';
import jsonServerProvider from 'ra-data-json-server';
// import { Login, Layout } from './layout';
import Dashboard from './Dashboard';
import { createMuiTheme } from '@material-ui/core/styles';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import germanMessages from 'ra-language-german';
require('dotenv').config();

// import polyglotI18nProvider from 'ra-i18n-polyglot';

const messages = {
    de: germanMessages,
    en: englishMessages,
};
const i18nProvider = polyglotI18nProvider(
    (locale) => (messages[locale] ? messages[locale] : messages.en),
    resolveBrowserLocale()
);
// const i18nProvider = polyglotI18nProvider(() => germanMessages, 'de');
const myTheme = createMuiTheme({
    palette: {
        type: 'dark', // Switching the dark mode on is a single property value change.
    },
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

const dataProvider = jsonServerProvider(
    process.env.REACT_APP_SERVER,
    httpClient
);
// const dataProvider = jsonServerProvider(
//     'https://service-portal-be.hosting7-p.tn-rechenzentrum1.de',
//     httpClient
// );
const App = () => (
    <Admin
        authProvider={authProvider}
        dataProvider={dataProvider}
        dashboard={Dashboard}
        theme={myTheme}
        i18nProvider={i18nProvider}
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
