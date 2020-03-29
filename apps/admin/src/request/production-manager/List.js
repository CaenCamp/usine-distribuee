import React from "react";
import {
    Datagrid,
    DateField,
    EditButton,
    Filter,
    List,
    Pagination,
    SelectInput,
} from "react-admin";

import { requestStatus, requesterType } from './index';

const UserFilter = props => (
    <Filter {...props}>
        <SelectInput
            source="status"
            label="Statut"
            choices={requestStatus}
            alwaysOn
        />
        <SelectInput
            source="requesterType"
            label="Type de professionnel"
            choices={requesterType}
        />
    </Filter>
);

const RequestPagination = props => (
    <Pagination rowsPerPageOptions={[10, 25]} {...props} />
);


const Status = ({ record }) => {
    return requestStatus.find(status => status.id === record.status).name;
};
const Type = ({ record }) => {
    return requesterType.find(type => type.id === record.requesterType).name;
};

export default (props) => (
    <List
        {...props}
        filters={<UserFilter />}
        sort={{ field: "createdAt", order: "ASC" }}
        exporter={false}
        pagination={<RequestPagination />}
        bulkActionButtons={false}
        title="Liste des commandes"
    >
        <Datagrid>
            <Type source="requesterType" label="Type de professionnel" />
            <Status source="status" label="Statut de la commande" />
            <DateField source="createdAt" label="Passé le" />
            <EditButton />
        </Datagrid>
    </List>
);
