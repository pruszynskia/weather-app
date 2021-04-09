import React, { useState } from 'react';
import { weatherStyles } from '../styles/common';
import { Card, CardMedia, CardContent } from "@material-ui/core";

const WeatherCardDetails = ({ weatherData, days, months }: any) => {
    const styles = weatherStyles();

    return (
        <div className={`
                ${styles.container}
                ${styles.row}
                `}
                > 
                    {weatherData ? (
                        weatherData.data.list.map((pos: any, id:any) =>
                        <div key={id} className={`
                            ${styles.container__card}
                            ${styles.row}
                            `}
                        >
                            <Card>
                                <CardMedia
                                    className={`
                                    ${styles.container__card}
                                    ${styles.cardImg}
                                    `}
                                    component="img"
                                    src={`http://openweathermap.org/img/wn/${pos.weather[0].icon}@2x.png`}
                                />
                                <CardContent 
                                    className={`
                                    ${styles.container__card}
                                    ${styles.column}
                                    `}
                                >
                                    <h2>{pos.weather[0].main}</h2>
                                    <p>{days[new Date(pos.dt*1000).getDay()]}</p>
                                    <p>
                                        {new Date(pos.dt*1000).getFullYear()}{' '}
                                        {months[new Date(pos.dt*1000).getMonth()]}{' '}
                                        {new Date(pos.dt*1000).getDay()}{' '}
                                        {new Date(pos.dt*1000).getHours()}{':00'}
                                    </p>
                                    <p>Min: {Math.round(pos.main.temp_min)} &deg;C</p>
                                    <p>Max: {Math.round(pos.main.temp_max)} &deg;C</p>
                                </CardContent>
                            </Card>
                        </div>
                    )) : null
                    }  
                </div>
    )
};

export default WeatherCardDetails;