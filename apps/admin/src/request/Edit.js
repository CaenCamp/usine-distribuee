import React from "react";
import { SelectInput, Edit, SimpleForm, TextInput } from "react-admin";

import { userRoles } from './index';

const Title = ({ record }) =>
    record ? `Edition d'utilisateur "${record.email}"` : null;

export default props => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="email" label="Email" fullWidth />
            <TextInput source="firstName" label="Prénom" fullWidth />
            <TextInput source="lastName" label="Nom" fullWidth />
            <TextInput source="phone" label="Téléphone" fullWidth />
            <SelectInput
                source="role"
                label="Role"
                choices={userRoles}
                fullWidth
            />
            <TextInput source="newPassword" label="Nouveau mot de passe" fullWidth />
        </SimpleForm>
    </Edit>
);
