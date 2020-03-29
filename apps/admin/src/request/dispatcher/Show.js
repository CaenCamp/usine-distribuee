import React from 'react';
import { Show, SimpleShowLayout, TextField, NumberField, DateField } from 'react-admin';

export default (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="requesterName" />
            <TextField source="requesterType" />
            <TextField source="requesterOtherType" />
            <TextField source="requesterProfessionalIdentifier" />
            <TextField source="contactName" />
            <TextField source="contactEmail" />
            <TextField source="contactPhone" />
            <TextField source="deliveryAddress" />
            <TextField source="deliveryPostalCode" />
            <TextField source="deliveryCity" />
            <TextField source="requesterComment" />
            <NumberField source="maskSmallSizeQuantity" />
            <NumberField source="maskLargeSizeQuantity" />
            <DateField source="createdAt" showTime />
            <DateField source="updatedAt" showTIme />
        </SimpleShowLayout>
    </Show>
);
