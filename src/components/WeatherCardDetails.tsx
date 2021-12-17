import React from 'react';
import { weatherStyles } from '../styles/common';
import { Card, CardContent } from "@material-ui/core";
import { IWeatherData } from '../lib/types';

interface CardProps {
    weather?: IWeatherData
}

const WeatherCardDetails = (props: CardProps) => {
    const styles = weatherStyles();
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
                    <p>{props.weather?.dt}</p>
                    <p>{Math.floor(props.weather?.main?.temp_max || 0) || 0} &deg;C</p>
                    <p>{props.weather?.weather?.[0]?.description || ''}</p>
                </CardContent>
            </Card>
        </div>
        
    )
};

export default WeatherCardDetails;