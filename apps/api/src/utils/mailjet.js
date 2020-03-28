const config = require("../config");

const mailjet = require("node-mailjet").connect(
  config.mailjet.publicKey,
  config.mailjet.privateKey
);

const sendRequestConfirmation = (emailTo, nameTo, maskRequestId) => {
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
        TemplateID: 1323123,
        TemplateLanguage: true,
        Subject: "Demande de masques enregistrée",
        Variables: {
          id_request: maskRequestId
        }
      }
    ]
  });
  request
    .then(result => {
      console.log(result.body);
    })
    .catch(err => {
      console.log(err.statusCode);
    });
};

exports.sendRequestConfirmation = sendRequestConfirmation;