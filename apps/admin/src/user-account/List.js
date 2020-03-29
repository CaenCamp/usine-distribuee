import React from "react";
import {
    Datagrid,
    DateField,
    EditButton,
    EmailField,
    Filter,
    List,
    Pagination,
    SelectInput,
    TextField,
    ChipField,
    ReferenceArrayField,
    SingleFieldList,
} from "react-admin";

import { userRoles } from './index';

const UserFilter = props => (
    <Filter {...props}>
        <SelectInput
            source="role"
            label="Role"
            choices={userRoles}
            alwaysOn
        />
    </Filter>
);

const UserPagination = props => (
    <Pagination rowsPerPageOptions={[10, 25]} {...props} />
);

const User = ({ record }) => {
    return record.first_name || record.last_name ?
        `${record.first_name} (${record.last_name})` :
        'Non renseigné';
};

const Role = ({ record }) => {
    return userRoles.find(role => role.id === record.role).name;
};

export default (props) => (
    <List
        {...props}
        filters={<UserFilter />}
        sort={{ field: "createdAt", order: "ASC" }}
        exporter={false}
        pagination={<UserPagination />}
        bulkActionButtons={false}
        title="Liste des utilisateurs"
    >
        <Datagrid>
            <User sortable={false} label="Nom" />
            <EmailField source="email" sortable={false} />
            <Role source="role" label="Role" />
            <TextField source="phone" sortable={false} label="Téléphone" />
            <ReferenceArrayField
                label="Pôle.s associé.s"
                reference="production-managements"
                source="productionManagementIds"
            >
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ReferenceArrayField>
            <DateField source="createdAt" label="Ajouté le" />
            <EditButton />
        </Datagrid>
    </List>
);
