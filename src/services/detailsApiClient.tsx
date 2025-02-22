import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: { key: "00917201171e40f5a31e4509e8f9f614" },
});
class DetailsApiClient<T> {
  endPoint: string;
  requestConfig?: AxiosRequestConfig;
  constructor(endPoint: string, requestConfig?: AxiosRequestConfig) {
    this.endPoint = endPoint;
    this.requestConfig = requestConfig;
  }
  get = () => {
    return axiosInstance
      .get<T>(this.endPoint, this.requestConfig)
      .then((res) => res.data);
  };
 
}

export default DetailsApiClient;
