import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Delete = () => {
    const goto = useNavigate();
    const [delSt, setDelSt] = useState("");

    const clickB = () => {
        axios
            .get(`http://fastAPI주소:포트번호/store.del?storename=${delSt}`)
            .then((res) => {
                alert(res.data.result);
            });
        setDelSt("");
    };

    return (
        <>
            <button
                onClick={() => {
                    goto("/crudtodb");
                }}
            >
                등록
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button
                onClick={() => {
                    goto("/update");
                }}
            >
                수정
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button
                onClick={() => {
                    goto("/del");
                }}
            >
                삭제
            </button>
            <table border={1}>
                <tr>
                    <td>
                        삭제할 가게명 :{" "}
                        <input
                            value={delSt}
                            onChange={(e) => {
                                setDelSt(e.target.value);
                            }}
                        />
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        <button onClick={clickB}>삭제</button>
                    </td>
                </tr>
            </table>
        </>
    );
};

export default Delete;
