const newWeatherData = {
    "monday": [1, 2, 3,4],
    "tuesday": [1, 2, 3,4],
    "wednesday": [1, 2, 3,4],
}
//  console.log(t.map(el => el+1))

// for(let el of Object.entries(newWeatherData))

Object.entries(newWeatherData).map((el) => {
    console.log(el[0], el[1])
})