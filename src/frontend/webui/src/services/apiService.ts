import axios from 'axios';
import { API_PATH } from '../constants/pathConstants';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { 'Content-Type': 'application/json' }
});

// plot

export const getAllPlots = (pageNumber: number, pageSize: number) =>
    apiClient.get(`/${API_PATH.PLOT_ENDPOINT}`, {
        params: {
            [API_PATH.PLOT_PAGE_NUMBER]: pageNumber,
            [API_PATH.PLOT_PAGE_SIZE]: pageSize
        }
    });

export const getPlot = (id: string) => apiClient.get(`/${API_PATH.PLOT_ENDPOINT}/${id}`);

export const postPlot = (plot: any) => apiClient.post(`/${API_PATH.PLOT_ENDPOINT}`, plot);

export const putPlot = (id: string, plot: any) => apiClient.put(`/${API_PATH.PLOT_ENDPOINT}/${id}`, plot);

export const deletePlot = (id: string) => apiClient.delete(`/${API_PATH.PLOT_ENDPOINT}/${id}`);