import React, { memo } from "react";
import "../styles/about.scss";
import img from "../images/myficture.jpg";

import {
  IoPerson,
  IoLocationSharp,
  IoMailSharp,
  IoCalendarClearOutline,
} from "react-icons/io5";

const About = memo(({ refs }) => {
  return (
    <section ref={refs} className="about-section">
      <div className="section-title">ABOUT ME</div>

      <div className="about-content">
        <img
          className="about-picture"
          src={img}
          alt="이미지 불러오기를 실패했습니다."
        ></img>
        <div className="about-info">
          <b className="info-title">"코딩이 세상을 바꾼다."</b>
          <div className="info">
            <br />
            안녕하세요. 끊임없는 성장을 추구하는 열정이 있는 개발자 이성현
            입니다.
            <br />
            새로운 기능을 배우고 재미있는 아이디어로 여러 개발을 하는 것을
            좋아합니다.
            <br />
            메카트로닉스를 전공했지만 4차산업시대에 맞춰 개발자를 지망하고
            있습니다.
            <br />
            '코딩이 세상을 바꾼다.' 라는 말처럼 코딩에 대한 관심을 가지게 되어
            많은 고민 끝에 진로를 변경하게 되었습니다.
            <br />
            늦게 시작한 만큼 코딩을 함에 있어서 확인하며 퀄리티 높은 작품을
            만들고 수정과 개선에 두려움없이 도전하는 개발자가 되겠습니다.
          </div>
          <ul>
            <li>
              <div className="info-li">
                <IoPerson className="icon" /> 이성현
              </div>
            </li>
            <li>
              <div className="info-li">
                <IoLocationSharp className="icon" /> 서울특별시 중랑구
              </div>
            </li>
            <li>
              <div className="info-li">
                <IoMailSharp className="icon" /> marvel97@naver.com
              </div>
            </li>
            <li>
              <div className="info-li">
                <IoCalendarClearOutline className="icon" /> 1997.11.25
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
});

export default About;
