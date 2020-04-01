import React, { useEffect } from "react";
import { useShowController } from "react-admin";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from '@material-ui/core/Tooltip';
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { makeStyles } from "@material-ui/core/styles";

import { ShowMainContent } from '../ShowMainContent';

const useStyles = makeStyles({
    root: { maxWidth: 800, margin: "auto" }
});

const copyToClipboard = str => {
    const el = document.createElement("textarea");
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
};

export default ({ renderActions, ...props }) => {
    const { record } = useShowController(props);
    const classes = useStyles();
    const ref = React.createRef();

    useEffect(() => {
        if (!ref) {
            return;
        }
        ref.current.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }, [ref]);

    const handleCopyToClipboard = value => () => copyToClipboard(value);

    if (!record) {
        return null;
    }

    return (
        <Card className={classes.root} ref={ref}>
            <CardContent>
                <ShowMainContent record={record} />
                {renderActions && renderActions(record, props)}
                <Typography
                    color="textSecondary"
                    variant="caption"
                    align="right"
                    gutterBottom
                >
                    {record.id}{" "}
                    <Tooltip title="Copier dans le presse-papier">
                        <IconButton
                            aria-label="Copier dans le presse-papier"
                            color="textSecondary"
                            size="small"
                            onClick={handleCopyToClipboard(record.id)}
                        >
                            <FileCopyIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Typography>
            </CardContent>
        </Card>
    );
};
