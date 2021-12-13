import { Card, CardMedia, CardContent } from '@material-ui/core'
import { weatherStyles } from '../styles/common'

const WeatherCard = (props: any) => {
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
            if(arr.length >= 5) {
                const icon = arr.find((el: any) => {
                    const hour = new Date(el?.dt * 1000).getHours()
                    return hour === 11
                });
                return icon.weather?.icon || ""
            } else {
                return arr[0].weather?.[0]?.icon || ""
            }
        } else {
            return "not available"
        }
    }


    function getDateString(data: any) {
        return new Date(data.filter((el: any) => new Date(el?.dt).getHours() === 18)[0]?.dt * 1000).toLocaleDateString()
    }

    function getWeatherName(arr: any) {
        if (arr.length) {
            if(arr.length >= 5) {
                const weatherName = arr.filter((el: any) => {
                    const hour = new Date(el?.dt * 1000).getHours()
                    return hour === 11
                })[0].weather[0].main
                return weatherName 
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
