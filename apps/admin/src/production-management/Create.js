import React from 'react';
import { Create, TextInput, SimpleForm, required } from 'react-admin';

export const ProductionManagementCreate = (props) => {
    return (
        <Create title="Création d'un nouveau pôle de gestion" {...props}>
            <SimpleForm redirect="list">
                <TextInput
                    source="name"
                    label="Nom"
                    fullWidth
                    validate={required()}
                />
                <TextInput
                    source="description"
                    multiline
                    label="Description"
                    fullWidth
                />
                <TextInput source="email" label="Email de contact" fullWidth />
                <TextInput
                    source="phone"
                    label="Téléphone de contact"
                    fullWidth
                />
            </SimpleForm>
        </Create>
    );
};
