import React, { useContext, useState } from "react";
import { UserContext } from "../userContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import axios from "axios";

const MyPage = () => {
    const { userId, setUserId } = useContext(UserContext);
    const navigate = useNavigate();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const [passUpd, setPassUpd] = useState({
        userId: userId,
        oldPass: "",
        newPass: "",
        newPassConform: "",
    });
    const changeUpdInput = (e) => {
        setPassUpd({ ...passUpd, [e.target.name]: e.target.value });
    };

    const userFD = new FormData();
    userFD.append("id", userId);
    userFD.append("oldPass", passUpd.oldPass);
    userFD.append("newPass", passUpd.newPass);
    userFD.append("newPassConform", passUpd.newPassConform);

    const delFD =new FormData();
    delFD.append("id", userId);

    const [passTC, setPassTC] = useState({
        position: "fixed",
        left: "-1000px",
        top: "-500px",
    });
    const [regDel, setRegDel] = useState({
        position: "fixed",
        left: "-3000px",
        top: "-1000px",
    });
    const clickPsU = () => {
        if (passTC.position === "fixed") {
            setPassTC({ ...passTC, position: "" });
        } else if (passTC.position === "") {
            setPassTC({ ...passTC, position: "fixed" });
        }
    };
    const clickPsUB = () => {
        // alert(JSON.stringify(passUpd));
        if (
            passUpd.newPass === passUpd.newPassConform &&
            passUpd.newPass !== ""
        ) {
            axios
                .post("http://fastAPI주소:포트번호/pass.upd", userFD, {
                    headers: { "Content-type": "multipart/form-data" },
                })
                .then((res) => {
                    alert(res.data.result);
                    setPassUpd({
                        ...passUpd,
                        oldPass: "",
                        newPass: "",
                        newPassConform: "",
                    });
                });
            setPassTC({ ...passTC, position: "fixed" });
        } else if (passUpd.newPass === "") {
            alert("비밀번호 빈칸은 안됨");
        } else if (passUpd.newPass !== passUpd.newPassConform) {
            alert("새로운 비밀번호 확인이 일치하지 않음");
        } else {
            alert("error");
        }
    };
    const clickDelB = () => {
        if (regDel.position === "fixed") {
            setRegDel({ ...regDel, position: "" });
        } else if (regDel.position === "") {
            setRegDel({ ...regDel, position: "fixed" });
        }
    };
    const clickYes = () => {
        axios.post("http://fastAPI주소:포트번호/id.del", delFD, {
            headers: { "Content-Type": "multipart/form-data" }
        }).then((res) => {
            alert(res.data.result);
        });
        setRegDel({ ...regDel, position: "fixed" });
        dispatch(logout());
        setUserId("");
        localStorage.removeItem("token");
        navigate("/");
    };
    const clickNo = () => {
        setRegDel({ ...regDel, position: "fixed" });
    };

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        setUserId("");
        localStorage.removeItem("token");
        navigate("/");
    };

    const cancelLogout = () => {
        setShowLogoutConfirm(false);
    };

    const askLogout = () => {
        if (showLogoutConfirm === false) {
            setShowLogoutConfirm(true);
        } else if (showLogoutConfirm === true) {
            setShowLogoutConfirm(false);
        }
    };

    return (
        <>
            <h1>{userId}의 정보를 수정합니다</h1>
            <button onClick={clickPsU}>비밀번호 변경</button>&nbsp;&nbsp;
            <button onClick={clickDelB}>회원 탈퇴</button>&nbsp;&nbsp;
            <button onClick={askLogout}>로그아웃</button>
            <table style={passTC}>
                <tr>
                    <td>
                        현재 비밀번호 :{" "}
                        <input
                            value={passUpd.oldPass}
                            name="oldPass"
                            onChange={changeUpdInput}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        변경할 비밀번호 :{" "}
                        <input
                            value={passUpd.newPass}
                            name="newPass"
                            onChange={changeUpdInput}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        비밀번호 확인 :{" "}
                        <input
                            value={passUpd.newPassConform}
                            name="newPassConform"
                            onChange={changeUpdInput}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <button onClick={clickPsUB}>변경</button>
                    </td>
                </tr>
            </table>
            <table style={regDel}>
                <tr>
                    <td colSpan={3}>{userId}님 회원 탈퇴하시겠습니까?</td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <button onClick={clickYes}>예</button>
                    </td>
                    <td>
                        <button onClick={clickNo}>아니오</button>
                    </td>
                </tr>
            </table>
            {showLogoutConfirm && (
                <table style={{ marginTop: "20px" }}>
                    <tr>
                        <td colSpan={3}>
                            {userId}님, 정말로 로그아웃 하시겠습니까?
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button onClick={handleLogout}>예</button>
                        </td>
                        <td>
                            <button onClick={cancelLogout}>아니오</button>
                        </td>
                    </tr>
                </table>
            )}
        </>
    );
};

export default MyPage;
