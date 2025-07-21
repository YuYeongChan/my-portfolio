import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CrudToDB = () => {
    const goto = useNavigate();
    const [storeReg, setStoreReg] = useState({
        cate: "",
        storename: "",
        averprice: "",
        image: "",
    });

    const storeFD = new FormData();
    storeFD.append("cate", storeReg.cate);
    storeFD.append("storename", storeReg.storename);
    storeFD.append("averprice", storeReg.averprice);
    storeFD.append("image", storeReg.image);
    const imageInput = useRef();

    const changeVal = (e) => {
        setStoreReg({ ...storeReg, [e.target.name]: e.target.value });
    };

    const clickB = () => {
        axios
            .post("http://fastAPI주소:포트번호/store.reg", storeFD, {
                headers: { "Content-Type": "multipart/form-data" },
                // withCredentials: true,
            })
            .then((res) => {
                alert(res.data.result);
            });
        setStoreReg({ cate: "", storename: "", averprice: "", image: "" });
        imageInput.current.value = "";
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
                        음식 카테고리 :{" "}
                        <select
                            value={storeReg.cate}
                            name="cate"
                            onChange={changeVal}
                        >
                            <option value="">-- 카테고리 선택</option>
                            <option value="chicken">치킨</option>
                            <option value="pizza">피자</option>
                            <option value="grill">구이</option>
                            <option value="burger">버거</option>
                            <option value="korean">한식</option>
                            <option value="japanese">일식</option>
                            <option value="snack">분식</option>
                            <option value="jokbalbossam">족발/보쌈</option>
                            <option value="soup">국/탕</option>
                            <option value="chinese">중식</option>
                            <option value="seafood">회/해산물</option>
                            <option value="western">양식</option>
                            <option value="cafe">커피/차</option>
                            <option value="dessert">디저트</option>
                            <option value="asian">아시안</option>
                            <option value="salad">샐러드</option>
                            <option value="doshirak">도시락</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        가게 상호명 :{" "}
                        <input
                            value={storeReg.storename}
                            name="storename"
                            onChange={changeVal}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        최소주문금액 :{" "}
                        <input
                            value={storeReg.averprice}
                            name="averprice"
                            onChange={changeVal}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        이미지 :{" "}
                        <input
                            ref={imageInput}
                            type="file"
                            onChange={(e) => {
                                setStoreReg({
                                    ...storeReg,
                                    image: e.target.files[0],
                                });
                            }}
                        />
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        <button onClick={clickB}>등록</button>
                    </td>
                </tr>
            </table>
        </>
    );
};

export default CrudToDB;
