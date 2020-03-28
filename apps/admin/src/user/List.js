import React from "react";
import { List, Datagrid, EmailField, TextField } from "react-admin";

export default (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <EmailField source="email" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <TextField source="phone" />
      <TextField source="role" />
    </Datagrid>
  </List>
);
