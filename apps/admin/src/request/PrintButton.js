import React from "react";
import { ShowButton } from "react-admin";

import PrintIcon from "@material-ui/icons/Print";

export const PrintButton = props => (
    <ShowButton
        {...props}
        target="_blank"
        label="Version imprimable"
        icon={<PrintIcon />}
    />
)
