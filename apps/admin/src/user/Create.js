import React from "react";
import { Create, SimpleForm, TextInput } from "react-admin";

export default props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="email" />
      <TextInput source="password" />
      <TextInput source="firstName" />
      <TextInput source="lastName" />
      <TextInput source="phone" />
      <TextInput source="role" />
    </SimpleForm>
  </Create>
);
