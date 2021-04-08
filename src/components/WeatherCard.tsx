import React, {useState} from 'react'
import {Card, CardMedia, CardContent} from '@material-ui/core'
import {weatherStyles } from '../styles/common'

export default function(props: any) {
    const styles = weatherStyles();

    function getMaxTemp(arr: any) {
        if(arr.length) {
            return Math.floor(Math.max(...arr.map((el: any) => el.main.temp_max)))
        } else {
            return 'not available'
        }
    }

    function getIcon(arr: any) {
        if (arr.length) {
            if(arr.length >= 4) {
                const icon = arr.filter((el: any) => {
                    const hour = new Date(el.dt * 1000).getHours()
                    return hour === 11
                })[0].weather[0].icon
                return icon 
            } else {
                return arr[0].weather[0].icon
            }
        } else {
            return "not available"
        }
    }

    return (
        <div 
            className={`
            ${styles.container}
            ${styles.column}
            `}
        >
            <Card>
                <CardMedia
                    className={`
                    ${styles.container__card}
                    ${styles.cardImg}
                    `}
                    component="img"
                    src={`http://openweathermap.org/img/wn/${getIcon(props.data)}@2x.png`}
                />
                <CardContent
                    className={`
                    ${styles.container__card}
                    ${styles.column}
                    `}
                >
                    <h2>{props.day}</h2>
                    {
                    props.data.length ? (
                    <>
                        {
                            <>
                            <div>{props.data.filter((el: any) => new Date(el.dt).getHours() === 18)[0].dt}</div>
                            <div> temp: {getMaxTemp(props.data)} &deg;C</div>
                            </>
                        }
                    </>
                    ) : null
                    }   
                </CardContent>
            </Card>
        </div>
    )
}

