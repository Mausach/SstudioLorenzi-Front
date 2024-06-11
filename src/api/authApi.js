import axios from "axios";
//http://localhost:4003
//https://studiolorenzi-back.onrender.com

export const authApi=axios.create({
    baseURL: "https://studiolorenzi-back.onrender.com",   
});


authApi.interceptors.request.use((config) => {
	config.headers = {
		'x-token': localStorage.getItem('token'),
	};
	return config;
});

export default authApi;