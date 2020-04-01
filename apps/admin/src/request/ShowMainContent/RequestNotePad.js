import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import { useMutation } from 'react-admin';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch'
    },
    button: {
        margin: theme.spacing(1)
    }
}));

export const RequestNotePad = ({ record, show }) => {
    const classes = useStyles();
    const [mutate, { loading }] = useMutation();
    const [comment, setComment] = useState('');

    const handleSendComment = () => {
        if (comment.trim() === '') {
            return;
        }
        mutate(
            {
                type: 'update',
                resource: 'dispatcher-requests',
                payload: {
                    id: record.id,
                    data: {
                        productionManagementComments: [
                            ...(record.productionManagementComments || []),
                            { comment }
                        ]
                    }
                }
            },
            {
                onSuccess: () => {
                    // refresh();
                    setComment('');
                }
            }
        );
    };

    return (
        <div role="tabpanel" hidden={!show}>
            <Grid container>
                <Grid item xs={12}>
                    <p>
                        <Typography variant="h6" gutterBottom>
                            Bloc-Notes de la demande #{record.publicNumber}
                        </Typography>
                    </p>
                    <TextField
                        label="Votre commentaire"
                        style={{ margin: 8 }}
                        helperText="Attention ! Vous ne pourrez pas l'effacer !"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                        value={comment}
                        onChange={(event) => {
                            setComment(event.target.value);
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        endIcon={<SendIcon />}
                        onClick={handleSendComment}
                        disabled={loading || !comment || comment.trim() === ''}
                    >
                        Envoyer votre commentaire
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};
