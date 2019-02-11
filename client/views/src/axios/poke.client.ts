import axios from 'axios';
import { environment } from '../environment';

export const pokeClient = axios.create({
  baseURL: environment.pokeContext,
  withCredentials: true
});
