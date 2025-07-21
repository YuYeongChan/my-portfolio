import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/userSlice";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const SiteHomeLogIn = () => {
    const { setUserId } = useContext(UserContext);
    // const [inputId, setInputId] = useState("");
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({ id: "", password: "" });
    // const [result, setResult] = useState([]);
    const goto = useNavigate();

    const changeUser = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const handleLogin = () => {
        const userFD = new FormData();
        userFD.append("id", userInfo.id);
        userFD.append("password", userInfo.password);

        axios
            .post("http://fastAPI주소:포트번호/user.login", userFD, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
                alert(res.data.result);
                // setResult(res.data);
                if (res.data.result === "success") {
                    const token = res.data.token;

                    // JWT 디코딩해서 userId 추출
                    const payload = jwtDecode(token);
                    const userId = payload.user_id;

                    // Redux에 저장
                    dispatch(setLogin({ userId, token }));

                    // Context에도 저장
                    setUserId(userId);

                    // 브라우저 저장소에 저장
                    localStorage.setItem("token", token);

                    goto("/home");
                } else {
                    alert(res.data.result);
                    setUserInfo({ id: "", password: "" });
                }
            })
            .catch((err) => {
                console.error(err);
                alert("서버 오류 발생");
            });
    };

    return (
        <>
            <h1 align="center">로그인</h1>
            <>아이디 : </>&nbsp;&nbsp;&nbsp;&nbsp;
            <input value={userInfo.id} name="id" onChange={changeUser} />
            <p />
            <>비밀번호 : </>
            <input
                value={userInfo.password}
                name="password"
                onChange={changeUser}
            />
            <p />
            <div align="left">
                <button onClick={handleLogin}>로그인</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button
                    onClick={() => {
                        goto("/createId");
                    }}
                >
                    회원가입
                </button>
            </div>
        </>
    );
};

export default SiteHomeLogIn;
