import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { weatherStyles } from '../styles/common';
import {
    Card,
    CardContent,
    CardMedia,
    TextField,
    Button
} from '@material-ui/core';
import { API_KEY , API_BASE_URL } from '../apis/apisConfig';

const Weather = () => {
    const styles = weatherStyles();

    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);

    const getWeatherData = async (city: any) => {
        const url = `${ API_BASE_URL}/data/2.5/forecast?q=${city}&cnt=16&appid=${API_KEY}&units=metric&mode=json`
        const data = await axios.get(url)
        
        //  console.log(data)
        return data
    }

    const getData = async () => {
        try{
            setLoading(true);
            const data = await getWeatherData(city);
            setWeatherData(data);
            setLoading(false);
        } catch(error) {
            console.log(error.message);
            setLoading(false)
        }
    }

    const getDate = (dt: any) => {
        let d = new Date(dt * 1000)
        return d.toLocaleDateString()
    }

    return (
        <div className={styles.root}>
            <div className={`
                ${styles.container}
                ${styles.row}
                `}
            >
                <TextField
                    label="Search"
                    variant="outlined"
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                />
                <Button
                    variant="contained"
                    onClick={getData}
                >
                    Search
                </Button>
            </div>
            <div className={`
                ${styles.container}
                ${styles.row}
                `}
            >
            {
            weatherData ? (
                weatherData.data.list.map((pos: any) =>
                <div className={`
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
                    {console.log(weatherData)}
                        <h2>{pos.weather[0].main}</h2>
                        <p>{getDate(pos.dt)}</p>
                        <p>Min: {pos.main.temp_min} *C</p>
                        <p>Max: {pos.main.temp_max} *C</p>
                    </CardContent>
                </Card>
                </div>
                )
            ) : null
            }
            </div>
        </div>
    )
};

export default Weather;