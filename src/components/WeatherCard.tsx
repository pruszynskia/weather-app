import { Card, CardMedia, CardContent } from '@material-ui/core'
import { weatherStyles } from '../styles/common'
import { IWeatherData, } from '../lib/types';

interface WeatherCardProps {
    data: IWeatherData[],
    day: string
    onClick: () => void
}

const WeatherCard = (props: WeatherCardProps) => {
    const styles = weatherStyles();

    function getMaxTemp(arr: IWeatherData[]) {
        if(arr.length > 0) {
            return Math.floor(Math.max(...arr.map((el: IWeatherData) => el.main?.temp_max || 0)))
        } else {
            return 'not available'
        }
    }
    function getIcon(arr: IWeatherData[]) {
        if (arr.length > 0) {
            if(arr.length >= 5) {
                const icon = arr.find((el: IWeatherData) => {
                    const hour = new Date(el?.dt * 1000).getHours()
                    return hour === 11 || hour === 12 || hour === 13
                });
                return icon?.weather[0].icon
            } else {
                return arr[0].weather?.[0].icon
            }
        } else {
            return "not available"
        }
    }


    function getDateString(data: IWeatherData[]) {
        return new Date(data.find((el: IWeatherData) => new Date(el?.dt || Date.now())?.getHours() === 18)?.dt || Date.now() )?.toLocaleDateString()
    }

    function getWeatherName(arr: IWeatherData[]) {
        if (arr.length) {
            if(arr.length >= 5) {
                const weatherName = arr.find((el: IWeatherData) => {
                    const hour = new Date(el?.dt * 1000).getHours()
                    return hour === 11 || hour === 12 || hour === 13
                })?.weather[0].main
                return weatherName || ""
            } else {
                return arr[0].weather[0].main
            }
        } else {
            return "not available"
        }
    }

    const handleClick = () => {

    }
    
    return (
        <div 
            className={`
            ${styles.container}
            ${styles.column}
            `}
        >
            {
            props.data.length ? (
                <Card
                    className={`
                    ${styles.glassMorphism}
                    `}
                    onClick={handleClick}
                >
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
                        <h2>{props.day.toUpperCase()}</h2>
                
                        <>
                            {
                                <div>
                                    <div><h1>{getMaxTemp(props.data)} &deg;C</h1></div>
                                    <div>{
                                        getDateString(props.data)
                                    }</div>
                                    <div>{getWeatherName(props.data).toUpperCase()}</div>
                                </div>
                            }
                            
                        </>
                    </CardContent>
                </Card>
            ) : null
            }   
        </div>
    )
}

export default WeatherCard;
