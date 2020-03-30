import React from "react";
import {
    Datagrid,
    DateField,
    ReferenceField,
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
    downloadCSV,
} from "react-admin";
import jsonExport from 'jsonexport/dist';

import { requesterType, requestStatus as REQUEST_STATUS } from './index';
import RequestShow from './Show';

const exporter = (requests, fetchRelatedRecords) => {
    fetchRelatedRecords(requests, 'productionManagementId', 'production-managements').then(managements => {
        const data = requests.map(request => ({
            ...request,
            pole_de_gestion: request.productionManagementId ? managements[request.productionManagementId].name : 'non affecté',
        }));
        jsonExport(data, {}, (err, csv) => {
            downloadCSV(csv, 'requests');
        });
    });
};

const UserFilter = props => (
    <Filter {...props}>
        <ReferenceInput
            label="Pôle de gestion"
            source="production_management_id"
            reference="production-managements"
            alwaysOn
        >
            <SelectInput optionText="name" />
        </ReferenceInput>
        <SelectInput
            source="status"
            label="Statut"
            choices={REQUEST_STATUS}
            style={{ minWidth: 250 }}
            alwaysOn
        />
        <SelectInput
            source="requester_type"
            label="Type de professionnel"
            choices={requesterType}
            style={{ minWidth: 250 }}
            alwaysOn
        />
        <TextInput
            source="delivery_postal_code"
            label="Code postal"
            style={{ minWidth: 250 }}
            alwaysOn
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
        <FunctionField source="status" label="Statut" render={({ status }) => REQUEST_STATUS.find(s => s.id === `${status}`).name} />
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
        exporter={exporter}
        pagination={<RequestPagination />}
        perPage={25}
        bulkActionButtons={false}
        title="Toutes les demandes"
    >
        <RequestDatagrid {...props} />
    </List>
);
