import React, { memo } from "react";

import "../styles/title.scss";

const Title = memo(() => {
  return (
    <section className="title_container">
      <div className="title_background"></div>
      <div className="title_filter"></div>{" "}
      <div className="title_contents">
        <h1>여행을 좋아하는 개발자</h1>
        <div className="line"></div>
        <h1>이성현</h1>
        <h2>웹 포트폴리오</h2>
        <h4>
          안녕하세요. 개발자(진) 이성현입니다.
          <br /> 언제나 새로운 것을 도전하는 것을 즐기고 새로운 아이디어를
          생각하는 것을 좋아합니다.
        </h4>
      </div>
    </section>
  );
});

export default Title;
