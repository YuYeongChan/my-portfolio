import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "./userContext";

const SiteLayout = () => {
    const goto = useNavigate();
    const location = useLocation();
    const { userId } = useContext(UserContext);
    const navRef = useRef(null);

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    useEffect(() => {
      const publicRoutes = ['/', '/createId'];
      if (!userId && !publicRoutes.includes(location.pathname)) {
            goto("/");
      }
    }, [userId, location, goto]);

    const onMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - navRef.current.offsetLeft);
        setScrollLeft(navRef.current.scrollLeft);
    };

    const onMouseLeave = () => {
        setIsDragging(false);
    };

    const onMouseUp = () => {
        setIsDragging(false);
    };

    const onMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - navRef.current.offsetLeft;
        const walk = (x - startX) * 2; // 스크롤 속도 조절
        navRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        goto("/");
        window.location.reload(); // 새로고침으로 context 초기화
    };

    return (
        <>
            <table
                style={{
                    width: "95%",
                    maxWidth: 1200,
                    margin: "20px auto",
                    tableLayout: "fixed",
                }}
            >
                <thead>
                    <tr>
                        <th
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                if (userId) {
                                    goto("/home");
                                } else {
                                    goto("/");
                                }
                            }}
                        >
                            사이트
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ textAlign: "right" }}>
                            {userId ? (
                                <>
                                    <button onClick={() => goto("/mypage")}>
                                        마이페이지
                                    </button>
                                    &nbsp;
                                    <button onClick={handleLogout}>
                                        로그아웃
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => goto("/")}>
                                        로그인
                                    </button>
                                    &nbsp;
                                    <button onClick={() => goto("/createId")}>
                                        회원가입
                                    </button>
                                </>
                            )}
                        </td>
                    </tr>

                    {userId && (
                        <tr>
                            <td
                                style={{
                                    padding: 0,
                                    maxWidth: "100%",
                                    overflow: "hidden",
                                }}
                            >
                                <div
                                    ref={navRef}
                                    style={{
                                        overflowX: "auto",
                                        whiteSpace: "nowrap",
                                        maxWidth: "100%",
                                        display: "block",
                                        cursor: isDragging
                                            ? "grabbing"
                                            : "grab",
                                    }}
                                    onMouseDown={onMouseDown}
                                    onMouseLeave={onMouseLeave}
                                    onMouseUp={onMouseUp}
                                    onMouseMove={onMouseMove}
                                >
                                    <Link to="/home">홈</Link>&nbsp;&nbsp;
                                    <Link to="/chicken">치킨</Link>&nbsp;&nbsp;
                                    <Link to="/pizza">피자</Link>&nbsp;&nbsp;
                                    <Link to="/grill">구이</Link>&nbsp;&nbsp;
                                    <Link to="/burger">버거</Link>&nbsp;&nbsp;
                                    <Link to="/korean">한식</Link>&nbsp;&nbsp;
                                    <Link to="/japanese">일식</Link>&nbsp;&nbsp;
                                    <Link to="/snacks">분식</Link>&nbsp;&nbsp;
                                    <Link to="/jokbalbossam">족발/보쌈</Link>
                                    &nbsp;&nbsp;
                                    <Link to="/soup">국/탕</Link>&nbsp;&nbsp;
                                    <Link to="/chinese">중식</Link>&nbsp;&nbsp;
                                    <Link to="/seafood">회/해산물</Link>
                                    &nbsp;&nbsp;
                                    <Link to="/western">양식</Link>&nbsp;&nbsp;
                                    <Link to="/cafe">커피/차</Link>&nbsp;&nbsp;
                                    <Link to="/dessert">디저트</Link>
                                    &nbsp;&nbsp;
                                    <Link to="/asian">아시안</Link>&nbsp;&nbsp;
                                    <Link to="/salad">샐러드</Link>&nbsp;&nbsp;
                                    <Link to="/board">게시판</Link>&nbsp;&nbsp;
                                    <Link to="/crudtodb">가게등록</Link>
                                    &nbsp;&nbsp;
                                    <Link to="/mypage">마이페이지</Link>
                                    &nbsp;&nbsp;
                                </div>
                            </td>
                        </tr>
                    )}
                    <tr>
                        <td>
                            <Outlet />
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default SiteLayout;
