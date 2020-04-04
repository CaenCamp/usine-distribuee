import permissions from './permissions';

export default {
    login: ({ username, password }) => {
        const request = new Request(
            `${process.env.REACT_APP_API_URL || ''}/authenticate`,
            {
                method: 'POST',
                body: JSON.stringify({ email: username, password }),
                headers: new Headers({ 'Content-Type': 'application/json' }),
                credentials:
                    process.env.REACT_APP_HTTP_CREDENTIALS || 'same-origin'
            }
        );
        return fetch(request)
            .then((response) => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({ token, role }) => {
                localStorage.setItem('token', token);
                localStorage.setItem('role', role);
            });
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        return Promise.resolve();
    },
    checkError: (error) => {
        return error.status === 403 ? Promise.reject() : Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('token')
            ? Promise.resolve()
            : Promise.reject();
    },
    getPermissions: () => {
        const role = localStorage.getItem('role');
        return role ? Promise.resolve(permissions[role]) : Promise.reject();
    }
};
