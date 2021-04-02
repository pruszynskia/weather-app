import { makeStyles } from '@material-ui/core';

export const weatherStyles = makeStyles(() => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    container: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        margin: "20px",
    },
    container__card: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        margin: "20px",
        maxWidth: "300px"
    },
    column: {
        flexDirection: "column"
    },
    row: {
        flexDirection: "row"
    },
    cardImg: {
        height: "200px",
        width: "200px"
    }
    
    
}));