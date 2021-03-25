// in src/authProvider.js
export default {
    // called when the user attempts to log in
    login: ({ username, password }) => {
        const authObj = { username: username, password: password };
        // const request = new Request('http://localhost:3005/auth/login', {
        const request = new Request(
            process.env.REACT_APP_SERVER + '/auth/login',
            {
                method: 'POST',
                body: JSON.stringify(authObj),
                headers: new Headers({ 'Content-Type': 'application/json' }),
            }
        );
        return fetch(request)
            .then((response) => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.message);
                }
                return response.json();
            })
            .then((auth) => {
                localStorage.setItem('token', auth.access_token);
                localStorage.setItem('username', username);
                return Promise.resolve();
            })
            .catch(() => {
                Promise.reject();
                throw new Error('Wrong credentials');
                return Promise.reject();
            });
        // localStorage.setItem('username', username);
        // // accept all username/password combinations
        // return Promise.resolve();
    },
    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        return localStorage.getItem('username')
            ? Promise.resolve()
            : Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise.resolve(),
};
