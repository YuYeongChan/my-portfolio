import React, { useEffect, useState } from 'react'
import axios from "axios"

const Pizza = () => {
  const [cate, setCate] = useState("pizza")
  const [store, setStore] = useState([])
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
  
  useEffect(() => {
    axios.get(`http://fastAPI주소:포트번호/store.get?d_cate=${cate}`).then((res) => {
      setStore(res.data);
      // alert(JSON.stringify(store));
    });
  }, []);

  return (
    <table>
      <tr>
        <td rowSpan={2}></td>
        <td>상호명</td>
      </tr>
      <tr>
        <td>최소주문금액</td>
      </tr>
      {storeTrs}
    </table>
  )
}

export default Pizza;