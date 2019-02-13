import axios from 'axios';
import { environment } from '../environment';

export const empClient = axios.create({
  baseURL: environment.empContext,
  withCredentials: true
});
