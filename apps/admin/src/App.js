import React from "react";
import { Admin } from "react-admin";
import { ResourceWithPermissions } from "ra-auth-acl";

import authProvider from "./authProvider";
import dataProvider from "./dataProvider";

import productionManagement from "./production-management";
import userAccount from "./user-account";
import dispatcher from "./request/dispatcher";
import productionManager from "./request/production-manager";

const App = () => (
    <Admin authProvider={authProvider} dataProvider={dataProvider}>
        {permissions => [
            <ResourceWithPermissions
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
                name="production-managements"
                {...productionManagement}
            />,
            <ResourceWithPermissions
                permissions={permissions}
                name="user-accounts"
                {...userAccount}
            />
        ]}
    </Admin>
);

export default App;
