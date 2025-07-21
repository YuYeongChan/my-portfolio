import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Update = () => {
    const goto = useNavigate();
    const [updInput, setUpdInput] = useState({ target: "", cate: "", to: "" });
    const changeInput = (e) => {
        setUpdInput({ ...updInput, [e.target.name]: e.target.value });
    };
    const clickB = () => {
        // alert(JSON.stringify(updInput));
        axios
            .get(
                `http://fastAPI주소:포트번호/store.upd?target=${updInput.target}&cate=${updInput.cate}&to=${updInput.to}`
            )
            .then((res) => {
                alert(res.data.result);
            });
        setUpdInput({ target: "", cate: "", to: "" });
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
                        수정할 가게명 :{" "}
                        <input
                            value={updInput.target}
                            name="target"
                            onChange={changeInput}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        수정할 항목 :{" "}
                        <select
                            value={updInput.cate}
                            name="cate"
                            onChange={changeInput}
                        >
                            <option value="">-- 수정 항목 선택 --</option>
                            <option value="d_cate">카테고리</option>
                            <option value="d_storename">상호명</option>
                            <option value="d_averprice">최소주문금액</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        수정사항 :{" "}
                        <input
                            value={updInput.to}
                            name="to"
                            onChange={changeInput}
                        />
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        <button onClick={clickB}>수정</button>
                    </td>
                </tr>
            </table>
        </>
    );
};

export default Update;
