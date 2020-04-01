import React from 'react';
import { Edit, TextInput, SimpleForm } from 'react-admin';

const ProductionManagementTitle = ({ record }) =>
    record ? `Edition de du pôle de gestion "${record.name}"` : null;

export const ProductionManagementEdit = (props) => {
    return (
        <Edit title={<ProductionManagementTitle />} {...props}>
            <SimpleForm>
                <TextInput source="name" label="Nom" fullWidth />
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
        </Edit>
    );
};
