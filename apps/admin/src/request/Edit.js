import React from 'react';
import {
    DeleteButton,
    Edit,
    NumberInput,
    TabbedForm,
    FormTab,
    TextInput,
    Toolbar,
    SaveButton,
    ListButton,
    SelectInput
} from 'react-admin';

import { requestStatus, requesterType } from './request';

const Title = ({ record }) => {
    const publicNumber = `${record.publicNumber}`.padStart(5, '0');
    return record
        ? `Edition de la demande #${publicNumber} (${
              requestStatus.find((status) => status.id === record.status).name
          })`
        : null;
};

const RequestEditToolbar = (props) => (
    <Toolbar {...props}>
        <SaveButton label="Sauver" redirect="list" submitOnEnter={false} />
        <ListButton label="Annuler et revenir à la liste" />
        <DeleteButton label="Demande annulée" />
    </Toolbar>
);

const RequestEditActions = () => null;

export default (props) => (
    <Edit title={<Title />} actions={<RequestEditActions />} {...props}>
        <TabbedForm toolbar={<RequestEditToolbar />}>
            <FormTab label="Commanditaire">
                <TextInput
                    source="requesterName"
                    label="Nom de la structure"
                    fullWidth
                />
                <SelectInput
                    source="requesterType"
                    label="Type de numéro professionnel"
                    choices={requesterType}
                />
                <TextInput
                    source="requesterProfessionalIdentifier"
                    label="Numero professionnel"
                    fullWidth
                />
                <TextInput
                    source="requesterOtherType"
                    label="Numero personnalisé"
                    fullWidth
                />
                <TextInput
                    source="requesterComment"
                    label="Commentaire lors de la demande"
                    multiline
                    fullWidth
                />
            </FormTab>
            <FormTab label="Contact">
                <TextInput
                    source="contactName"
                    label="Nom du contact"
                    fullWidth
                />
                <TextInput
                    source="contactEmail"
                    label="Email du contact"
                    fullWidth
                />
                <TextInput
                    source="contactPhone"
                    label="Téléphone du contact"
                    fullWidth
                />
            </FormTab>
            <FormTab label="Livraison">
                <TextInput
                    source="deliveryAddress"
                    label="Adresse de livraison"
                    fullWidth
                />
                <TextInput
                    source="deliveryPostalCode"
                    label="Code postal de livraison"
                    fullWidth
                />
                <TextInput
                    source="deliveryCity"
                    label="Ville de livraison"
                    fullWidth
                />
            </FormTab>
            <FormTab label="Demande">
                <NumberInput
                    source="maskSmallSizeQuantity"
                    label="Masque modèle standard (24cm)"
                    fullWidth
                />
                <NumberInput
                    source="maskLargeSizeQuantity"
                    label="Masque modèle long (34cm)"
                    fullWidth
                />
            </FormTab>
        </TabbedForm>
    </Edit>
);
