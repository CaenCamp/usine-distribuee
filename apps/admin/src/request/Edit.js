import React from "react";
import {
    Edit,
    NumberInput,
    TabbedForm,
    FormTab,
    TextInput,
    Toolbar,
    SaveButton,
} from "react-admin";

import { requestStatus } from './request';


const Title = ({ record }) =>
    record ? `Edition de la demande #${record.publicNumber} (${requestStatus.find(
        status => status.id === record.status
    ).name})` : null;

const RequestEditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton
            label="Sauver"
            redirect="list"
            submitOnEnter={true}
        />
    </Toolbar>
);

const RequestEditActions = () => null;

export default props => (
    <Edit title={<Title />} actions={<RequestEditActions />} {...props}>
        <TabbedForm toolbar={<RequestEditToolbar />} redirect="list">
            <FormTab label="Commanditaire">
                <TextInput source="requesterName" label="Nom de la structure" fullWidth />
                <TextInput source="requesterType" label="Type de structure" fullWidth />
                <TextInput source="requesterProfessionalIdentifier" label="Numero professionnel" fullWidth />
                <TextInput source="requesterComment" label="Commentaire lors de la demande" multiline fullWidth />
            </FormTab>
            <FormTab label="Contact">
                <TextInput source="contactName" label="Nom du contact" fullWidth />
                <TextInput source="contactEmail" label="Email du contact" fullWidth />
                <TextInput source="contactPhone" label="Téléphone du contact" fullWidth />

            </FormTab>
            <FormTab label="Livraison">
                <TextInput source="deliveryAddress" label="Adresse de livraison" fullWidth />
                <TextInput source="deliveryPostalCode" label="Code postal de livraison" fullWidth />
                <TextInput source="deliveryCity" label="Ville de livraison" fullWidth />
            </FormTab>
            <FormTab label="Demande">
                <NumberInput source="maskSmallSizeQuantity" label="Masque modèle standard (24cm)" fullWidth />
                <NumberInput source="maskLargeSizeQuantity" label="Masque modèle long (34cm)" fullWidth />
            </FormTab>
        </TabbedForm>
    </Edit>
);
