import React from "react";
import { Admin } from "react-admin";

import authProvider from "./authProvider";
import dataProvider from "./dataProvider";

const App = () => (
  <Admin
    authProvider={authProvider}
    dataProvider={dataProvider}
  />
);

export default App;
