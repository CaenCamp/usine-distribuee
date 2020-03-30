import React from "react";
import {
    Datagrid,
    DateField,
    ReferenceField,
    SingleFieldList,
    ChipField,
    Filter,
    List,
    Pagination,
    TextInput,
    SelectInput,
    DateInput,
    ReferenceInput,
    TextField,
    NumberField,
    FunctionField,
} from "react-admin";

import { requesterType, requestStatus as REQUEST_STATUS } from './index';
import RequestShow from './Show';

const UserFilter = props => (
    <Filter {...props}>
        <SelectInput
            source="requester_type"
            label="Type de professionnel"
            choices={requesterType}
            style={{ minWidth: 250 }}
        />
        <ReferenceInput label="Pôle de gestion" source="production_management_id" reference="production-managements">
            <SelectInput optionText="name" />
        </ReferenceInput>
        <TextInput
            source="delivery_postal_code"
            label="Code postal"
            style={{ minWidth: 250 }}
        />
        <TextInput
            source="delivery_city"
            label="Ville"
            style={{ minWidth: 250 }}
        />
        <DateInput
            source="created_at_after"
            label="Passée depuis le"
            style={{ minWidth: 250 }}
        />
        <DateInput
            source="created_at_before"
            label="Passée avant le"
            style={{ minWidth: 250 }}
        />
    </Filter>
);

const RequestPagination = props => (
    <Pagination rowsPerPageOptions={[10, 25]} {...props} />
);

const RequestDatagrid = props => (
    <Datagrid {...props} expand={<RequestShow />} rowClick="expand">
        <TextField source="requesterName" label="Organisation" />
        <FunctionField source="status" label="Statut" render={({status}) => REQUEST_STATUS.find(s => s.id === `${status}`).name} />
        <ReferenceField label="Pôle de gestion" source="productionManagementId" reference="production-managements">
            <TextField source="name" />
        </ReferenceField>
        <NumberField source="maskSmallSizeQuantity" label="Masques Standards" />
        <NumberField source="maskLargeSizeQuantity" label="Masques Longs" />
        <FunctionField label="Localité" render={({ deliveryPostalCode, deliveryCity }) => `${deliveryPostalCode} ${deliveryCity}`} />
        <DateField source="createdAt" label="Passé le" showTime />
    </Datagrid>
)

export default (props) => (
    <List
        {...props}
        filters={<UserFilter />}
        sort={{ field: "createdAt", order: "ASC" }}
        exporter={false}
        pagination={<RequestPagination />}
        bulkActionButtons={false}
        title="Liste des demandes"
    >
        <RequestDatagrid {...props} />
    </List>
);