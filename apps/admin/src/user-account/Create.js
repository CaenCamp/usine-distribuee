import React from "react";
import {
    Create,
    ReferenceArrayInput,
    required,
    SelectArrayInput,
    SelectInput,
    SimpleForm,
    TextInput,
} from "react-admin";
import owasp from "owasp-password-strength-test";

import { userRoles } from "./index";

const validPassword = (value) => {
    const passwordTest = owasp.test(value);
    if (passwordTest.requiredTestErrors.length) {
        return `Le mot de passe n'est pas valide : ${passwordTest.requiredTestErrors.join(
            ", "
        )}`;
    }
    if (!passwordTest.strong) {
        return `Le mot de passe n'est pas assez complexe : ${passwordTest.optionalTestErrors.join(
            ", "
        )}`;
    }
    return undefined;
};

const validateUserCreation = (values) => {
    const errors = {};

    if (
        values.role === "production_manager" &&
        values.productionManagementIds &&
        !values.productionManagementIds.length
    ) {
        errors.role =
            'Vous devez associer au moins un pôle de gestion pour le rôle "Pôle de gestion".';
    }

    if (
        values.role === "guest" &&
        values.productionManagementIds &&
        values.productionManagementIds.length
    ) {
        errors.role =
            'Vous ne devez pas associer de pôle de gestion pour le rôle "Invité".';
    }

    return errors;
};

export default (props) => (
    <Create title="Création d'un utilisateur" {...props}>
        <SimpleForm validate={validateUserCreation}>
            <TextInput
                source="email"
                label="Email"
                fullWidth
                validate={required()}
            />
            <SelectInput
                source="role"
                label="Role"
                choices={userRoles}
                validate={required()}
                fullWidth
            />
            <ReferenceArrayInput
                label="Pôle.s associé.s"
                source="productionManagementIds"
                reference="production-managements"
            >
                <SelectArrayInput optionText="name" />
            </ReferenceArrayInput>
            <TextInput
                source="password"
                label="Mot de passe"
                validate={[required(), validPassword]}
                fullWidth
            />
            <TextInput source="firstName" label="Prénom" fullWidth />
            <TextInput source="lastName" label="Nom" fullWidth />
            <TextInput source="phone" label="Téléphone" fullWidth />
        </SimpleForm>
    </Create>
);
