import axios from 'axios';
import { ILocation } from '../types';
import { generateQuery } from '../utils/string';

const API_KEY = '';

export const fetchCurrentCast = async (location: ILocation) => {
  // @ts-ignore
  const query = generateQuery(location);

  try {
    const results = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?appid=${API_KEY}${query}`);

    return results;
  } catch (err) {
    console.log((err as Error).message);
    return { data: null };
  }
}