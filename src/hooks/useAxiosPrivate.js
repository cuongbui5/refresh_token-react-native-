import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { getAccessTokenFromStorage } from "../utils/TokenUtil";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            async config => {
                const token = await getAccessTokenFromStorage();
                if (token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error.response.status === 401 && error.response.data.message === 'JWT verification failed') {
                    console.log("refresh token ....!");
                    const newAccessToken = await refresh();
                    console.log(newAccessToken)
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [refresh, axiosPrivate]);

    return axiosPrivate;
}

export default useAxiosPrivate;
