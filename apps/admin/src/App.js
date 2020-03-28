import React from "react";
import { Admin, Resource } from "react-admin";

import authProvider from "./authProvider";
import dataProvider from "./dataProvider";

const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider}>
    <Resource name="test" />
  </Admin>
);

export default App;
