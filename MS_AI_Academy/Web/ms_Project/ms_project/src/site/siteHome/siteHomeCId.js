import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SiteHomeCId = () => {
    const [user, setUser] = useState({
        id: "",
        password: "",
        gender: "",
        regnum: "",
    });
    const changeInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const goto = useNavigate();

    const userFD = new FormData();
    userFD.append("id", user.id);
    userFD.append("password", user.password);
    userFD.append("gender", user.gender);
    userFD.append("regnum", user.regnum);

    const idreg = () => {
        axios
            .post("http://fastAPI주소:포트번호/id.reg", userFD, {
                headers: { "Content-Type": "multipart/form-data" },
                // withCredentials: true,
            })
            .then((res) => {
                alert(res.data.result);
            });
        setUser({ id: "", password: "", gender: "", regnum: "" });
        goto("/");
    };

    return (
        <>
            <h1 align="center">회원가입</h1>
            <>아이디 : </>&nbsp;&nbsp;&nbsp;&nbsp;
            <input value={user.id} name="id" onChange={changeInput} />
            <p />
            <>비밀번호 : </>
            <input
                value={user.password}
                name="password"
                onChange={changeInput}
            />
            <p />
            <>성별 : </>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <select value={user.gender} name="gender" onChange={changeInput}>
                <option value="">남성 / 여성</option>
                <option value="M">남성</option>
                <option value="F">여성</option>
            </select>
            <p />
            <>주민번호 앞자리 : </>&nbsp;
            <input value={user.regnum} name="regnum" onChange={changeInput} />
            <p />
            <button onClick={idreg}>회원등록</button>
        </>
    );
};

export default SiteHomeCId;
