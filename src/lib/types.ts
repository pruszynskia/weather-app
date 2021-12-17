export interface IWeatherData {
  dt: number;
  main?: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string
    }
  ];
  clouds: {
    all: number
  };
  wind: {
    speed: number;
    deg: number;
    gust: number
  };
  visibility: number;
  pop: number;
  rain: {
    '3h': number
  };
  sys: {
    pod: string
  };
  dt_txt: string
}

export interface INewWeatherData {
  monday: IWeatherData[],
  tuesday: IWeatherData[],
  wednesday: IWeatherData[],
  thursday: IWeatherData[],
  friday: IWeatherData[],
  saturday: IWeatherData[],
  sunday: IWeatherData[],
}
