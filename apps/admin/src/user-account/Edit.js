import React from 'react';
import {
    Edit,
    ReferenceArrayInput,
    SelectArrayInput,
    SelectInput,
    SimpleForm,
    TextInput
} from 'react-admin';

import { userRoles } from './index';

const Title = ({ record }) =>
    record ? `Edition d'utilisateur "${record.email}"` : null;

export default props => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="email" label="Email" fullWidth />
            <SelectInput
                source="role"
                label="Role"
                choices={userRoles}
                fullWidth
            />
            <ReferenceArrayInput
                label="Pôle.s associé.s"
                source="productionManagementIds"
                reference="production-managements"
            >
                <SelectArrayInput optionText="name" />
            </ReferenceArrayInput>
            <TextInput source="firstName" label="Prénom" fullWidth />
            <TextInput source="lastName" label="Nom" fullWidth />
            <TextInput source="phone" label="Téléphone" fullWidth />
            <TextInput
                source="newPassword"
                label="Nouveau mot de passe"
                fullWidth
            />
        </SimpleForm>
    </Edit>
);
