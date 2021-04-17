import { makeStyles } from '@material-ui/core';

export const weatherStyles = makeStyles(() => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "linear-gradient(0deg, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 100%)",
        height: "100vh"
    },
    container: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        margin: "20px",
    },
    container__card: {
        color: "white",
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
    },
    glassMorphism: {
        background: "rgba( 255, 255, 255, 0.4 )",
        boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
        backdropFilter: "blur( 4px )",
        webkitBackdropFilter: "blur( 4px )",
        borderRadius: "10px",
        border: "1px solid rgba( 255, 255, 255, 0.18 )"
    }
}));