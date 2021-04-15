const newWeatherData = {
    "monday": [1, 2, 3,4],
    "tuesday": [1, 2, 3,4],
    "wednesday": [1, 2, 3,4],
}
//  console.log(t.map(el => el+1))

// for(let el of Object.entries(newWeatherData))

console.log(Object.entries(newWeatherData).sort((a, b) => {
    if(a[1][1] - b[1][2] < 0) return -1
    else return 1
}))