import axios from "../api/axios";
import { useAuth } from "../context/AuthProvider";
import { getRefreshTokenFromStorage, saveTokensToStorage } from "../utils/TokenUtil";

const useRefreshToken = () => {
    const { logout } = useAuth();

    const refresh = async () => {
        try {
          
            const res = await axios.post('/auth/token', {
                refreshToken: await getRefreshTokenFromStorage(),
            });
           
            

            const { accessToken, refreshToken } = res.data;
            await saveTokensToStorage(accessToken, refreshToken);

            return accessToken;
        } catch (e) {
            if (e.response && e.response.status === 401) {
                logout();
            }
            throw e;
        }
    };

    return refresh;
};

export default useRefreshToken;
