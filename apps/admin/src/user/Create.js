import React from "react";
import { Create, SimpleForm, TextInput, SelectInput, required } from "react-admin";

import { userRoles } from './index';

export default props => (
    <Create title="Création d'un utilisateur" {...props}>
        <SimpleForm>
            <TextInput source="email" label="Email" fullWidth validate={required()} />
            <SelectInput
                source="role"
                label="Role"
                choices={userRoles}
                validate={required()}
                fullWidth
            />
            <TextInput source="password" label="Mot de passe" validate={required()} fullWidth />
            <TextInput source="firstName" label="Prénom" fullWidth />
            <TextInput source="lastName" label="Nom" fullWidth />
            <TextInput source="phone" label="Téléphone" fullWidth />
        </SimpleForm>
    </Create>
);
