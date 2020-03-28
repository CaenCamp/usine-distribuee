import React from "react";
import { Edit, SimpleForm, TextInput } from "react-admin";

export default props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="email" />
      <TextInput source="password" />
      <TextInput source="firstName" />
      <TextInput source="lastName" />
      <TextInput source="phone" />
      <TextInput source="role" />
    </SimpleForm>
  </Edit>
);
