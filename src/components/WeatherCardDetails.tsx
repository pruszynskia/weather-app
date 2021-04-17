import React, { useState } from 'react';
import { weatherStyles } from '../styles/common';
import { Card, CardMedia, CardContent } from "@material-ui/core";

const WeatherCardDetails = (props: any) => {
    const styles = weatherStyles();
    console.log("props", props)
    return (
        <div className={`
            ${styles.container}
            ${styles.column}
            `}
        > 
            <Card 
                className={`
                ${styles.container__card}
                ${styles.row}
                ${styles.glassMorphism}
                `}
            > 
                <CardContent>
                    <p>{props[0].dt}</p>
                    <p>{Math.floor(props[0].main.temp_max)} &deg;C</p>
                    <p>{props[0].weather[0].description}</p>
                </CardContent>
            </Card>
        </div>
        
    )
};

export default WeatherCardDetails;