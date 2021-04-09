import React, { useState } from 'react';
import axios from 'axios';
import { weatherStyles } from '../styles/common';
import {
    Button,
    Card,
    CardContent,
    CardMedia,
    TextField
} from '@material-ui/core';
import { API_KEY , API_BASE_URL } from '../apis/apisConfig';
import WeatherCard from './WeatherCard';
import WeatherCardDetails from './WeatherCardDetails';

const Weather = () => {
    const styles = weatherStyles();

    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState<any | null>(null);
    const [newWeatherData, setNewWeatherData] = useState<any | null>({
        sunday: [],
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: []
    })
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true)

    const getWeatherData = async (city: any) => {
        const url = `${ API_BASE_URL}/data/2.5/forecast?q=${city}&cnt=40&appid=${API_KEY}&units=metric&mode=json`
        const data = await axios.get(url)
        return data
    }

    const getData = async (e: any) => {
        e.preventDefault()
        try{
            const data = await getWeatherData(city);
            setWeatherData(data);
            setLoading(false);
        } catch(error) {
            setLoading(false)
        }
    }

    
    // Date
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
    
        const days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];

    // Separate days
    function getByDay(arr: any) {
        let newDates: any = {
            sunday: [],
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: []
        }
        
        for(var i of arr) {
            let d = new Date(i.dt*1000);
            let day: any = days[d.getDay()].toLowerCase();
            newDates[day].push(i);
        }
        return newDates
    }
    // Max Temp


    if (weatherData && loading2) {
        let nWD = getByDay(weatherData.data.list)
        setNewWeatherData(nWD)
        setLoading2(false)
    }
    


    console.log("newWeatherData", newWeatherData)

    return (
        <div className={styles.root}>
            {/* Search bar */} 
            <form className={`
                ${styles.container}
                ${styles.row}
                `}
                onSubmit={getData}
            >
                <TextField
                    label="Search"
                    variant="outlined"
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                />
                <Button
                    type="submit"
                    variant="contained"
                >
                    Search
                </Button>
            </form>

            {/* Daily forecast */}
            <div className={`
                    ${styles.container}
                    ${styles.column}
                    `}
            >
                <div className={`
                    ${styles.container}
                    ${styles.row}
                    `}
                >
                    {
                        Object.entries(newWeatherData).map((el: any) => {
                            return <WeatherCard data={el[1]} day={el[0]} />
                        })
                    }
                    {
                        <WeatherCardDetails />
                    }
                </div>
            </div>
        </div>
    )
};

export default Weather;