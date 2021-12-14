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
import { INewWeatherData, IWeatherData } from '../lib/types';

type IDay = "monday" | 
            "tuesday" |
            "wednesday" |
            "thursday" | 
            "friday" |
            "saturday" | 
            "sunday"

const Weather = () => {
    const styles = weatherStyles();

    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState<IWeatherData[] | null>(null);

    const [newWeatherData, setNewWeatherData] = useState<any | null>(null)
    const [loading, setLoading] = useState<boolean>(false);
    const [loading2, setLoading2] = useState<boolean>(false)

    const [selectedDay, setSelectedDay] = useState(null);

    const getWeatherData = async (city: string) => {
        const url = `${ API_BASE_URL}/data/2.5/forecast?q=${city}&cnt=40&appid=${API_KEY}&units=metric&mode=json`
        const data = await axios.get(url)
        return data.data.list
    }

    const getData = async (e: any) => {
        e.preventDefault()

            try{
                setLoading(true)
                const data = await getWeatherData(city);
                setWeatherData(data);
                setLoading(false);
            } catch(error) {
                setLoading(false)
            }
        
    }

        const days: IDay[] = [
            "sunday",
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday"
        ];

    // Separate days
    function getByDay(arr: IWeatherData[]): INewWeatherData {
        let newDates: INewWeatherData = {
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: []
        }
        if(!arr.length) {
            return newDates
        }
        arr.forEach((w: IWeatherData) =>  {
            let d = new Date(w.dt*1000);
            let day: IDay = days[d.getDay()].toLowerCase() as IDay;
            // if(!newDates[day]) newDates[day] = []
            newDates[day].push(w);
        })
        return newDates
    }
    // Max Temp


    if (weatherData && loading2) {
        let nWD = getByDay(weatherData)

        console.log("nwd", nWD)
        setNewWeatherData(nWD)
        setLoading2(false)
    }

    if(loading) {
        return <div>Loading...</div>
    }
    
    
    console.log("newWeatherData", newWeatherData)

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
                        selectedDay ? <WeatherCardDetails weather={newWeatherData[selectedDay || ''][0]} /> :
                        Object.entries(newWeatherData).map((el: any,  id: number) => {
                            console.log(el[1])
                            return <WeatherCard key={id} data={el[1]} day={el[0]}  onClick={() => setSelectedDay(el[0])}/>
                        }) 
                    }
                    {newWeatherData.monday ?
                        <WeatherCardDetails weather={newWeatherData.monday} />
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