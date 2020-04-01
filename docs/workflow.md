| status               | Initiator view        | Dispatcher view                                                             | Management view                                   |
| -------------------- | --------------------- | --------------------------------------------------------------------------- | ------------------------------------------------- |
| DISPATCH_TODO        | Prise en compte       | A dispatcher<br>[Modifier, Commenter, Rejeter, Mettre en attente, Affecter] | --                                                |
| DISPATCH_REJECTED    | Rejeté                | Rejeté<br>[Modifier, Commenter, Annuler]                                    | --                                                |
| DISPATCH_PENDING     | Demande d'information | En attente<br>[Modifier, Commenter, Affecter, Annuler]                      | --                                                |
| MANAGEMENT_TODO      | En fabrication        | Fabrication demandée<br>[Commenter]                                         | A fabriquer<br>[Modifier, Commenter, Commencer]   |
| MANAGEMENT_BUILDING  | En fabrication        | En fabrication<br>[Commenter]                                               | En fabrication<br>[Modifier, Commenter, Terminer] |
| MANAGEMENT_BUILT     | Fabriqué              | Fabriqué<br>[Commenter]                                                     | A livrer<br>[Modifier, Commenter, Livrer]         |
| MANAGEMENT_DELIVERED | Livré                 | Livré<br>[Commenter]                                                        | Livré<br>[Modifier, Commenter]                    |
