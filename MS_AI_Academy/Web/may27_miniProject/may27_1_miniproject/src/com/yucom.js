import React, { useEffect, useRef, useState } from 'react'
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://node주소:포트번호");

const YuCom = () => {
    const [com, setCom] = useState({cate: "", name: "", price: "", image: ""});
    const [coms, setComs] = useState([]);

    const comFD = new FormData();
    comFD.append("cate", com.cate);
    comFD.append("name", com.name);
    comFD.append("price", com.price);
    comFD.append("image", com.image);
    const imageInput = useRef();

    const changeCom = (e) => {
        setCom({...com, [e.target.name]: e.target.value});
    };

    // alert(JSON.stringify(coms));

    const comsTrs = coms.map((c, i) => {
        return (
            <>
                <tr>
                    <td rowSpan={3}><img src={c.image} alt='' width="150px"/></td>
                    <td>{c.cate}</td>
                </tr>
                <tr>
                    <td>{c.name}</td>
                </tr>
                <tr>
                    <td>{c.price}원</td>
                </tr>
            </>
        )
    });

    useEffect(() => {
        axios.get("http://fastAPI주소:포트번호/com.get").then((msg2) => {
            // alert(JSON.stringify(msg2.data));
            setComs(msg2.data);
        });

        socket.on("srvMsg", (msg2) => {
            // alert(JSON.stringify(msg2));
            axios.get("http://fastAPI주소:포트번호/com.get").then((msg2) => {
            // alert(JSON.stringify(msg2.data));
                setComs(msg2.data);
            });
        });
        
    
        return () => {
            socket.off("srvMsg");
        };
    }, []);
    
    const comReg = () => {
        axios.post("http://fastAPI주소:포트번호/com.reg", comFD, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
        })
        .then((res) => {alert(res.data.result);});
        socket.emit("clntMsg", com);
        setCom({cate: "", name: "", price: "", image: ""});
        imageInput.current.value = "";
    }
    
  return <>
        카테고리 : <input value={com.cate} name='cate' onChange={changeCom}/><p/>
        제품명 : <input value={com.name} name='name' onChange={changeCom}/><p/>
        가격 : <input value={com.price} name='price' onChange={changeCom}/><p/>
        이미지 : <input ref={imageInput} type='file' onChange={(e) => {setCom({...com, image: e.target.files[0]});}} /><p/>
        <button onClick={comReg}>등록</button>
        <hr/>
        <table border={1} style={{textAlign: "center"}}>
            <tr>
                <td rowSpan={3}>이미지</td>
                <td>분류</td>
            </tr>
            <tr>
                <td>이름</td>
            </tr>
            <tr>
                <td>가격</td>
            </tr>
            {comsTrs}
        </table>
    </>
}

export default YuCom;