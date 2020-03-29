import React from "react";
import { Admin, Resource } from "react-admin";

import authProvider from "./authProvider";
import dataProvider from "./dataProvider";

import productionManagement from "./production-management";
import userAccount from './user-account';
import request from './request';


const App = () => (
    <Admin authProvider={authProvider} dataProvider={dataProvider}>
        <Resource name="requests" {...request} />
        <Resource name="production-managements" {...productionManagement} />
        <Resource name="user-accounts" {...userAccount} />
    </Admin>
);

export default App;
