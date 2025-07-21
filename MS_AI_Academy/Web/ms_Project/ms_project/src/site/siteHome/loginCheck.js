import axios from "axios";
import { setLogin, logout } from "../../redux/userSlice";

export const loginCheck = async (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
        dispatch(logout());
        return;
    }

    try {
        const response = await axios.get(
            "http://fastAPI주소:포트번호/auth/verify",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.data?.valid) {
            const newToken = response.data.newToken || token;
            dispatch(
                setLogin({
                    userId: response.data.userId,
                    token: newToken,
                })
            );
            localStorage.setItem("token", newToken);
        } else {
            dispatch(logout());
            localStorage.removeItem("token");
        }
    } catch (err) {
        console.error("loginCheck 오류:", err);
        dispatch(logout());
        localStorage.removeItem("token");
    }
};
