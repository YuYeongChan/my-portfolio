import React, { useContext, useState } from "react";
import { UserContext } from "../userContext";

const Board = () => {
    const { userId } = useContext(UserContext);
    const [txt, setTxt] = useState("");
    const [posts, setPosts] = useState([]);

    const changetxt = (e) => {
        const input = e.target.value;
        if (input.length <= 1000) {
            setTxt(input);
        }
    };

    const clickB = () => {
        if (txt.trim() === "") return;

        const now = new Date();
        const formattedDate = now.toLocaleString();

        const newPost = {
            author: userId,
            text: txt,
            date: formattedDate,
        };

        setPosts([...posts, newPost]);
        setTxt("");
    };

    const formatText = (text) => {
        const escapedText = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        return escapedText.replace(/\n/g, "<br />");
    };

    return (
        <>
            <table style={{ width: "95%", margin: "0 auto" }}>
                <thead>
                    <tr>
                        <th>자유게시판</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post, idx) => (
                        <tr key={idx}>
                            <td
                                style={{
                                    padding: "10px",
                                    borderTop: "1px solid #ccc",
                                }}
                            >
                                <div style={{ fontWeight: "bold" }}>
                                    {post.author}
                                </div>
                                <div
                                    style={{
                                        wordBreak: "break-word",
                                        whiteSpace: "pre-wrap",
                                        marginTop: "5px",
                                    }}
                                    dangerouslySetInnerHTML={{
                                        __html: formatText(post.text),
                                    }}
                                />
                                <div
                                    style={{
                                        fontSize: "12px",
                                        color: "#888",
                                        marginTop: "5px",
                                    }}
                                >
                                    {post.date}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <table
                width={"95%"}
                style={{ margin: "0 auto", marginTop: "20px" }}
            >
                <tbody>
                    <tr>
                        <td style={{ position: "relative", width: "90%" }}>
                            <textarea
                                style={{
                                    width: "100%",
                                    height: "6em",
                                    padding: "10px",
                                    fontSize: "14px",
                                    resize: "none",
                                    boxSizing: "border-box",
                                }}
                                placeholder="내용을 입력하세요...(1000자 제한)"
                                value={txt}
                                onChange={changetxt}
                            />
                            <div
                                style={{
                                    position: "absolute",
                                    bottom: "8px",
                                    right: "12px",
                                    fontSize: "12px",
                                    color: "rgba(0, 0, 0, 0.4)",
                                }}
                            >
                                {txt.length} / 1000
                            </div>
                        </td>
                        <td
                            style={{
                                width: "10%",
                                textAlign: "center",
                                verticalAlign: "top",
                            }}
                        >
                            <button
                                style={{
                                    width: "100%",
                                    height: "6em",
                                    fontSize: "14px",
                                    cursor: "pointer",
                                }}
                                onClick={clickB}
                            >
                                등록
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default Board;
