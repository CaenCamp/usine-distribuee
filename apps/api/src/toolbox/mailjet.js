const config = require("../config");
const signale = require("signale");

const mailjet = require("node-mailjet").connect(
    config.mailjet.publicKey,
    config.mailjet.privateKey
);

const sendRequestConfirmation = ({
    emailTo,
    nameTo,
    maskRequestId,
    publicNumber
}) => {
    if (config.env === "development") {
        signale.info(
            `Envoi d'un mail de tracking à "${nameTo}<${emailTo}>". Demande #${publicNumber} (${maskRequestId})`
        );
        return;
    }
    const request = mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
            {
                From: {
                    Email: "contact@usinepartagee.fr",
                    Name: "Usine partagée Normandie"
                },
                To: [
                    {
                        Email: emailTo,
                        Name: nameTo
                    }
                ],
                TemplateID: config.mailjet.maskRequestConfirmTemplateId,
                TemplateLanguage: true,
                Subject: "Demande de masques enregistrée",
                Variables: {
                    id_request: maskRequestId,
                    public_number: publicNumber
                }
            }
        ]
    });
    request.catch(err => {
        signale.error("Mailjet error: " + err.statusCode);
    });
};

module.exports = {
  sendRequestConfirmation,
};
