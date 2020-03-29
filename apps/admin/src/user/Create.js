import React from "react";
import { Create, SimpleForm, TextInput, SelectInput, required } from "react-admin";
import owasp from 'owasp-password-strength-test';

import { userRoles } from './index';

const validPassword = value => {
    const passwordTest = owasp.test(value);
    if (passwordTest.requiredTestErrors.length) {
        return `Le mot de passe n'est pas valide : ${passwordTest.requiredTestErrors.join(', ')}`;
    }
    if (!passwordTest.strong) {
        return `Le mot de passe n'est pas assez complexe : ${passwordTest.optionalTestErrors.join(', ')}`;
    }
    return undefined
}

export default props => (
    <Create title="Création d'un utilisateur" {...props}>
        <SimpleForm>
            <TextInput source="email" label="Email" fullWidth validate={required()} />
            <SelectInput
                source="role"
                label="Role"
                choices={userRoles}
                validate={required()}
                fullWidth
            />
            <TextInput source="password" label="Mot de passe" validate={[required(), validPassword]} fullWidth />
            <TextInput source="firstName" label="Prénom" fullWidth />
            <TextInput source="lastName" label="Nom" fullWidth />
            <TextInput source="phone" label="Téléphone" fullWidth />
        </SimpleForm>
    </Create>
);
