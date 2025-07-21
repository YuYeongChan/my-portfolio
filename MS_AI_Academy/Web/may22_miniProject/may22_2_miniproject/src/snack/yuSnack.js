import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://주소:9922");

const YuSnack = () => {
    const [snack, setSnack] = useState({ name: "", price: "" });
    const [snacks, setSnacks] = useState([]);
    const [updtcss, setUpdtcss] = useState({
        position: "fixed",
        top: "-80px",
        left: "-80px",
    });
    const [update, setUpdate] = useState({
        target: "바꿀과자(이름)",
        what: "바꿀항목(이름, 가격)",
        to: "뭐로바꿔",
    });
    const [delcss, setDelcss] = useState({
        position: "fixed",
        top: "-150px",
        left: "-150px",
    });
    const [delTarget, setDelTarget] = useState("");

    const updateStart = (name) => {
        setUpdtcss({ ...updtcss, top: "0px", left: "400px" });
        setUpdate({ ...update, target: name });
    };
    const deleteB = (name) => {
        setDelTarget(name);
        setDelcss({ ...delcss, top: "0px", left: "600px" });
    };

    const snacksTrs = snacks.map((s, i) => {
        return (
            <>
                <tr key={i}>
                    <td
                        onClick={() => {
                            updateStart(s.name);
                        }}
                    >
                        {s.name}
                    </td>
                    <td
                        onClick={() => {
                            updateStart(s.name);
                        }}
                    >
                        {s.price}원
                    </td>
                    <td>
                        <button
                            onClick={() => {
                                deleteB(s.name);
                            }}
                        >
                            삭제
                        </button>
                    </td>
                </tr>
            </>
        );
    });

    useEffect(() => {
        axios.get("http://주소:9911/snack.get").then((msg2) => {
            // alert(JSON.stringify(msg2.data));
            setSnacks(msg2.data);
        });

        socket.on("srvMsg", (msg2) => {
            // alert(JSON.stringify(msg2));
            axios.get("http://주소:9911/snack.get").then((msg2) => {
                // alert(JSON.stringify(msg2.data));
                setSnacks(msg2.data);
            });
        });

        return () => {
            socket.off("srvMsg");
        };
    }, []);

    const snackReg = () => {
        axios
            .get(
                `http://주소:9911/snack.reg?name=${snack.name}&price=${snack.price}`
            )
            .then((res) => {
                alert(res.data.result);
            });
        // alert(JSON.stringify(snack));
        socket.emit("clntMsg", snack);
        setSnack({ name: "", price: "" });
    };

    const snackUpdate = () => {
        axios
            .get(
                `http://주소:9911/snack.update?target=${update.target}&what=${update.what}&to=${update.to}`
            )
            .then((res) => {
                alert(res.data.result);
            });
        socket.emit("clntMsg", update);
        setUpdate({
            target: "바꿀과자(이름)",
            what: "바꿀항목(이름, 가격)",
            to: "뭐로바꿔",
        });
        setUpdtcss({ position: "fixed", top: "-80px", left: "-80px" });
    };

    const delYes = () => {
        axios
            .get(`http://주소:9911/snack.del?name=${delTarget}`)
            .then((res) => {
                alert(res.data.result);
            });
        socket.emit("clntMsg", delTarget);
        setDelTarget("");
        setDelcss({ position: "fixed", top: "-150px", left: "-150px" });
    };

    return (
        <>
            이름 :{" "}
            <input
                value={snack.name}
                onChange={(e) => {
                    setSnack({ ...snack, name: e.target.value });
                }}
            />
            <br />
            가격 :{" "}
            <input
                value={snack.price}
                onChange={(e) => {
                    setSnack({ ...snack, price: e.target.value });
                }}
            />
            <br />
            <button onClick={snackReg}>등록</button>
            <hr />
            <table border={1}>
                <tr>
                    <th>과자 이름</th>
                    <th>가격</th>
                    <th>삭제</th>
                </tr>
                {snacksTrs}
            </table>
            <table style={updtcss}>
                <tr>
                    <td>
                        <input
                            value={update.target}
                            onChange={(e) => {
                                setUpdate({
                                    ...update,
                                    target: e.target.value,
                                });
                            }}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <input
                            value={update.what}
                            onChange={(e) => {
                                setUpdate({ ...update, what: e.target.value });
                            }}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <input
                            value={update.to}
                            onChange={(e) => {
                                setUpdate({ ...update, to: e.target.value });
                            }}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <button onClick={snackUpdate}>바꾸기</button>
                    </td>
                </tr>
            </table>
            <table style={delcss}>
                <tr>
                    <td colSpan={3}>{delTarget}을(를) 삭제하시겠습니까?</td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <button onClick={delYes}>예</button>
                    </td>
                    <td>
                        <button
                            onClick={() =>
                                setDelcss({
                                    position: "fixed",
                                    top: "-150px",
                                    left: "-150px",
                                })
                            }
                        >
                            아니오
                        </button>
                    </td>
                </tr>
            </table>
        </>
    );
};

export default YuSnack;
