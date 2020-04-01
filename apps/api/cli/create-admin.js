const knex = require('knex');
const signale = require('signale');
const owasp = require('owasp-password-strength-test');
const bcrypt = require('bcrypt');

const knexConfig = require('../knexfile');

owasp.config({
    allowPassphrases: true,
    maxLength: 128,
    minLength: 10,
    minPhraseLength: 20,
    minOptionalTestsToPass: 4
});

const pg = knex(knexConfig);

const validateEmail = (email) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
};

const createAdmin = async () => {
    signale.info("Création d'un administrateur");
    const { ADMIN_EMAIL: email, ADMIN_PASSWORD: password } = process.env;
    if (!email) {
        throw new Error(
            "Vous devez déclarer une variable d'environnement ADMIN_EMAIL avec un email valide pour pouvoir créer un administrateur"
        );
    }
    if (!validateEmail(email)) {
        throw new Error(`${email} n'est pas un email valide`);
    }
    if (!password) {
        throw new Error(
            "Vous devez déclarer une variable d'environnement ADMIN_PASSWORD avec un mot de passe de plus de 10 caractères pour pouvoir créer un administrateur"
        );
    }
    const passwordTest = owasp.test(password);
    if (passwordTest.requiredTestErrors.length) {
        throw new Error(
            `Le mot de passe n'est pas valide : ${passwordTest.requiredTestErrors.join(
                ', '
            )}`
        );
    }
    if (!passwordTest.strong) {
        throw new Error(
            `Le mot de passe n'est pas assez complexe : ${passwordTest.optionalTestErrors.join(
                ', '
            )}`
        );
    }
    const salt = bcrypt.genSaltSync(10);
    const bPassword = bcrypt.hashSync(password, salt);
    signale.info(`On va créer un admin ${email}`);
    await pg('user_account').insert({
        email,
        password: bPassword,
        role: 'admin'
    });

    return true;
};

createAdmin()
    .then(() => {
        signale.info('Le nouvel administrateur a bien été créé.');
        process.exit(0);
    })
    .catch((error) => {
        signale.error(
            "Erreur lors de la création de l'administrateur : ",
            error.message
        );
        process.exit(1);
    });
