import React from 'react';
import { Datagrid, EditButton, List, Pagination, TextField } from 'react-admin';

const ProductionManagementPagination = props => (
    <Pagination rowsPerPageOptions={[1, 10, 25, 50]} {...props} />
);

export const ProductionManagementList = props => {
    return (
        <List
            {...props}
            sort={{ field: 'name', order: 'ASC' }}
            exporter={false}
            pagination={<ProductionManagementPagination />}
            bulkActionButtons={false}
            title="Liste des pôles de gestion"
        >
            <Datagrid>
                <TextField source="name" label="Nom" />
                <TextField
                    source="description"
                    label="Description"
                    sortable={false}
                />
                <TextField
                    source="email"
                    label="Email de contact"
                    sortable={false}
                />
                <TextField source="phone" label="Téléphone de contact" />
                <EditButton />
            </Datagrid>
        </List>
    );
};
