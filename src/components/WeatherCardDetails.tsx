import React, { useState } from 'react';
import { weatherStyles } from '../styles/common';
import { Card, CardMedia, CardContent } from "@material-ui/core";

const WeatherCardDetails = (props: any) => {
    const styles = weatherStyles();

    console.log(props)
    return (
        <div className={`
            ${styles.container}
            ${styles.row}
            `}
        > 
            <Card>
                <CardMedia />
                <CardContent>
                    
                </CardContent>
            </Card>
        </div>
    )
};

export default WeatherCardDetails;