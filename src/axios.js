import axios from "axios";
import { baseUrl } from "./Constant/constants";

const instance = axios.create({
    baseURL: baseUrl,
  });


  export default instance 