import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";


const PrivateRoute = ({ children }) => {
    const token = useSelector((state) => state.user.token);

    // 토큰이 없으면 로그인 페이지로 이동
    if (!token) {
        return <Navigate to ="/" replace />
    }

    return children;
};

export default PrivateRoute;