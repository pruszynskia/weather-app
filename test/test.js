
const a = [
    {dt: 12345, temp: 1},
    {dt: 12346, temp: 2},
    {dt: 12347, temp: 3},
    {dt: 12348, temp: 5},
    {dt: 12349, temp: 100}
];

const getMaxTemp = (a) => {
    return Math.max(...a.map(el => el.temp))
}

const consoleLog = () => {
    if (0) {
        console.log("0")
    } else {
        console.log("else")
    }
}
//  console.log(getMaxTemp(a))

 var t = [
     1, 2, 3, 4
 ]

//  console.log(t.map(el => el+1))
consoleLog()