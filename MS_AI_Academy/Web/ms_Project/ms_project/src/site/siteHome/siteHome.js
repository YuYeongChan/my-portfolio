import React, { useContext, useState } from 'react';
import { UserContext } from '../userContext';
import axios from 'axios';

const SiteHome = () => {
  const [money, setMoney] = useState("");
  const [store, setStore] = useState([]);
  const storeTrs = store.map((s, i) => {
    return (
      <>
        <tr>
          <td rowSpan={2}><img src={s.image} alt='' width="150px"/></td>
          <td>{s.storename}</td>
        </tr>
        <tr>
          <td>{s.averprice}</td>
        </tr>
      </>
    )
  })
  const changeInput = (e) => {
    setMoney(e.target.value);
  }
  const clickB = () => {
    if (money === "") {
      alert("돈을 적어 임마")
    } else if (money !== "") {

      axios.get(`http://fastAPI주소:포트번호/store.recommand.get?money=${money}`).then((res) => {
        setStore(res.data);
      });
    }
  }
  const { userId } = useContext(UserContext);

  return (
    <>
      <h1>{userId}님 안녕하세요</h1>
      <>가진돈 : </><input value={money} onChange={changeInput}/><p />
      <button onClick={clickB}>메뉴추천</button>
      <br />
      <table>
        <tr>
          <td rowSpan={2}></td>
          <td>상호명</td>
        </tr>
        <tr>
          <td>최소주문금액(원)</td>
        </tr>
        {storeTrs}        
      </table>
    </>
  );
};

export default SiteHome;