import React from "react";
import { Admin, Resource } from "react-admin";

import authProvider from "./authProvider";
import dataProvider from "./dataProvider";
import ProductionManagement from "./production-management";

const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider}>
    <Resource name="test" />
    <Resource name="production-managements" {...ProductionManagement} />
  </Admin>
);

export default App;
