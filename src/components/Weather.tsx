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

const Weather = ({icon, main, temp_min, temp_max, dt}: any) => {
    const styles = weatherStyles(); 

    const [city, setCity] = useState('')
    // Weather.tsx:70 Uncaught TypeError: Cannot read property 'main' of null
    const [weatherData, setWeatherData] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);

    const date = new Date(dt)

    const getWeatherData = async (city: any) => {
        const url = `${ API_BASE_URL}/data/2.5/forecast?q=${city}&cnt=5&appid=${API_KEY}&units=metric&mode=json`
        const data = await axios.get(url)
        
         console.log(data)
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

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <TextField
                    label="Search"
                    variant="outlined"
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                />
                <Button
                    variant="contained"
                    onClick={() => getData()}
                >
                    Search
                </Button>
            </div>
            <Card>
                {/* <CardMedia 
                    image={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                /> */}
                {
                weatherData ? 
                <CardContent>
                <h2>{main}</h2>
                <p>{date.toLocaleDateString()} - {date.toLocaleTimeString()}</p>
                <p>Cloudy</p>
                <p>Min: {weatherData.temp_min}</p>
                <p>Max: {weatherData.temp_max}</p>
                </CardContent>
                : ""
                }
            </Card>
        </div>
    )
};

export default Weather;