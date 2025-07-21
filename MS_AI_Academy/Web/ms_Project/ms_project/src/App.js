import { Route, Routes } from "react-router-dom";
import "./App.css";
import SiteLayout from "./site/siteLayout";
import SiteHomeLogIn from "./site/siteHome/siteHomeLogIn";
import Chicken from "./site/menuCate/chicken";
import Pizza from "./site/menuCate/pizza";
import Grill from "./site/menuCate/grill";
import Burger from "./site/menuCate/burger";
import Korean from "./site/menuCate/korean";
import Japanese from "./site/menuCate/japanese";
import Snacks from "./site/menuCate/snacks";
import Jokbalbossam from "./site/menuCate/jokbalbossam";
import Soup from "./site/menuCate/soup";
import Chinese from "./site/menuCate/chinese";
import Seafood from "./site/menuCate/seafood";
import Western from "./site/menuCate/western";
import Cafe from "./site/menuCate/cafe";
import Dessert from "./site/menuCate/dessert";
import Asian from "./site/menuCate/asian";
import Salad from "./site/menuCate/salad";
import Doshirak from "./site/menuCate/doshirak";
import CrudToDB from "./site/siteHome/crudToDB";
import Update from "./site/siteHome/update";
import Delete from "./site/siteHome/delete";
import SiteHomeCId from "./site/siteHome/siteHomeCId";
import SiteHome from "./site/siteHome/siteHome";
import { UserProvider } from "./site/userContext";
import MyPage from "./site/siteHome/myPage";
import Board from "./site/siteHome/board";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
// import { loginCheck } from "./site/siteHome/loginCheck";
import { logout, setLogin } from "./redux/userSlice";
import axios from "axios";
import PrivateRoute from "./components/privateRoute";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const loginCheck = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const res = await axios.get(
                        "http://fastAPI주소/auth/verify",
                        {
                            Headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    if (res.data.valid) {
                        // 토큰 유효 -> 로그인 유지
                        dispatch(
                            setLogin({
                                userId: res.data.userId,
                                token: res.data.newToken,
                            })
                        );
                        localStorage.setItem("token", res.data.newToken); // 갱신된 토큰 저장
                    } else {
                        dispatch(logout());
                        localStorage.removeItem("token");
                    }
                } catch (err) {
                    console.error("loginCheck 실패", err);
                    dispatch(logout());
                    localStorage.removeItem("token");
                }
            }
        };
        loginCheck();
    }, [dispatch]);

    return (
        <UserProvider>
            <Routes>
                <Route element={<SiteLayout />}>
                    <Route index element={<SiteHomeLogIn />} />
                    <Route path="/createId" element={<SiteHomeCId />} />
                    <Route path="/home" element={<SiteHome />} />
                    <Route path="/chicken" element={<Chicken />} />
                    <Route path="/pizza" element={<Pizza />} />
                    <Route path="/grill" element={<Grill />} />
                    <Route path="/burger" element={<Burger />} />
                    <Route path="/korean" element={<Korean />} />
                    <Route path="/japanese" element={<Japanese />} />
                    <Route path="/snacks" element={<Snacks />} />
                    <Route path="/jokbalbossam" element={<Jokbalbossam />} />
                    <Route path="/soup" element={<Soup />} />
                    <Route path="/chinese" element={<Chinese />} />
                    <Route path="/seafood" element={<Seafood />} />
                    <Route path="/western" element={<Western />} />
                    <Route path="/cafe" element={<Cafe />} />
                    <Route path="/dessert" element={<Dessert />} />
                    <Route path="/asian" element={<Asian />} />
                    <Route path="/salad" element={<Salad />} />
                    <Route path="/doshirak" element={<Doshirak />} />
                    <Route path="/crudtodb" element={<CrudToDB />} />
                    <Route path="/update" element={<Update />} />
                    <Route path="/del" element={<Delete />} />
                    <Route
                        path="/mypage"
                        element={
                            <PrivateRoute>
                                <MyPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/board"
                        element={
                            <PrivateRoute>
                                <Board />
                            </PrivateRoute>
                        }
                    />
                </Route>
            </Routes>
        </UserProvider>
    );
}

export default App;
