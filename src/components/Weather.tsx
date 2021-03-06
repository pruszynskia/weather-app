import React, { useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button'
import { weatherStyles } from '../styles/common';
import {
    TextField
} from '@material-ui/core';
import { API_KEY , API_BASE_URL } from '../apis/apisConfig';
import WeatherCard from './WeatherCard';
import WeatherCardDetails from './WeatherCardDetails';

const Weather = () => {
    const styles = weatherStyles();

    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState<any | null>(null);

    const [newWeatherData, setNewWeatherData] = useState<any | null>(null)
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true)

    const [selectedDay, setSelectedDay] = useState(null);

    const getWeatherData = async (city: any) => {
        const url = `${ API_BASE_URL}/data/2.5/forecast?q=${city}&cnt=40&appid=${API_KEY}&units=metric&mode=json`
        const data = await axios.get(url)
        data.data.list.forEach((el: any, id: any) => el.id = id)
        return data.data
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
            
        }
        
        for(var i of arr) {
            let d = new Date(i.dt*1000);
            let day: any = days[d.getDay()].toLowerCase();
            if(!newDates[day]) newDates[day] = []
            newDates[day].push(i);
        }
        return newDates
    }
    // Max Temp


    if (weatherData && loading2) {
        let nWD = getByDay(weatherData.list)

        console.log("nwd", nWD)
        setNewWeatherData(nWD)
        setLoading2(false)
    }

    // console.log("weatherData", weatherData)
    console.log(selectedDay)
    return (
        <div className={styles.root}>
            {/* Search bar */} 
            <form className={`
                ${styles.container}
                ${styles.row}
                `}
                onSubmit={async (e: any) => {
                    await getData(e);
                    setLoading2(true);
                }}
            >
                <TextField
                    
                    label="Search"
                    variant="standard"
                    onChange={(e) => {
                        
                        setCity(e.target.value);
                    }}
                    value={city}
                />
                <Button variant="contained" type="submit">Search</Button>
            </form>

            {/* Daily forecast */}
            {newWeatherData ? 
            
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
                        selectedDay ? <WeatherCardDetails /> :
                        Object.entries(newWeatherData).map((el: any, id: number) => {
                            return <WeatherCard key={id} data={el[1]} day={el[0]}  onClick={(c: any) => setSelectedDay(el[0])}/>
                        }) 
                    }
                    {newWeatherData.monday ?
                        <WeatherCardDetails {...newWeatherData.monday} />
                        :  
                        <div />
                    }
                </div>
            </div>
            : <div />}
        </div>
    )
};

export default Weather;