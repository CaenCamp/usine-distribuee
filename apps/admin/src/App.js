import React from "react";
import { Admin, Resource } from "react-admin";

import authProvider from "./authProvider";
import dataProvider from "./dataProvider";
import ProductionManagement from "./production-management";
import userAccount from './user';

const App = () => (
    <Admin authProvider={authProvider} dataProvider={dataProvider}>
        <Resource name="production-managements" {...ProductionManagement} />
        <Resource name="user_account" {...userAccount} />
    </Admin>
);

export default App;
