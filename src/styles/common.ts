import { makeStyles } from '@material-ui/core';

export const weatherStyles = makeStyles(() => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    container: {
        flexDirection: "row"        
    }
}));