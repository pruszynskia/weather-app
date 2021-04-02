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
        
        //  console.log(url, "URL")
        return data
    }

    const getData = async (e: any) => {
        e.preventDefault()
        try{
            const data = await getWeatherData(city);
            setWeatherData(data);
            setLoading(false);
        } catch(error) {
            // console.log(error.message, "ERROR");
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

    function getMaxTemp(arr: any) {
        let maxTemp = 0
        return maxTemp
    }
    if (weatherData && loading2) {
        // console.log(getByDay(weatherData.data.list), "GET BY DAY")
        let nWD = getByDay(weatherData.data.list)
        setNewWeatherData(nWD)
        setLoading2(false)
    }
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
                    <Card>
                        <CardContent 
                            className={`
                            ${styles.container__card}
                            ${styles.column}
                            `}
                        >
                            <h2>Monday</h2>
                            {
                            newWeatherData.monday.length ? (
                            <>
                                {console.log(newWeatherData.monday)}
                                {
                                    <div>{newWeatherData.monday.filter((el: any) => new Date(el.dt).getHours() === 18)[0].dt}</div>
                                }
                            </>
                            ) : null
                            }
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent
                            className={`
                            ${styles.container__card}
                            ${styles.column}
                            `}
                        >
                            <h2>Tuesday</h2>
                            {
                            newWeatherData.monday.length ? (
                            <>
                                <p>{console.log(newWeatherData.monday)} </p>
                                {
                                    <div>{newWeatherData.monday.filter((h: any) => new Date(h.dt).getHours() === 18)[0].dt}</div>
                                }
                            </>
                            ) : null
                            }   
                        </CardContent>
                    </Card>
                </div>

                {/* 3 Hour forecast */}
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
            </div>
        </div>
    )
};

export default Weather;