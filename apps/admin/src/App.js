import React from "react";
import { Admin } from "react-admin";
import { ResourceWithPermissions } from "ra-auth-acl";
import polyglotI18nProvider from 'ra-i18n-polyglot';
import frenchMessages from 'ra-language-french';

import authProvider from "./authProvider";
import dataProvider from "./dataProvider";

import productionManagement from "./production-management";
import userAccount from "./user-account";
import dispatcher from "./request/dispatcher";
import productionManager from "./request/production-manager";
import request from "./request/request";

const i18nProvider = polyglotI18nProvider(() => frenchMessages, 'fr');

const App = () => (
    <Admin
        authProvider={authProvider}
        dataProvider={dataProvider}
        i18nProvider={i18nProvider}
    >
        {permissions => [
            permissions['dispatcher-requests'] && permissions['dispatcher-requests'].enabled && <ResourceWithPermissions
                permissions={permissions}
                name="dispatcher-requests"
                {...dispatcher}
            />,
            <ResourceWithPermissions
                permissions={permissions}
                name="production-manager-requests"
                {...productionManager}
            />,
            <ResourceWithPermissions
                permissions={permissions}
                name="requests"
                {...request}
            />,
            <ResourceWithPermissions
                permissions={permissions}
                name="production-managements"
                {...productionManagement}
            />,
            <ResourceWithPermissions
                permissions={permissions}
                name="user-accounts"
                {...userAccount}
            />
        ].filter(Boolean)}
    </Admin>
);

export default App;
