import React, { memo } from "react";

import "../styles/portfolio.scss";
import paint from "../images/paint.png";
import pickup from "../images/pickups.png";
import note from "../images/note.gif";
import picker from "../images/picker.gif";
import gangstertalk from "../images/gangstertalk.png"
import popol from "../images/popol.png";

const Portfolio = memo(({ refs }) => {
  return (
    <section ref={refs} className="portfolio-section">
      <div className="section-title">PORTFOLIO</div>
      <div className="portfolio-content">
        {/* 1번 */}
        <div className="portfolio-info-area">
          <div className="portfolio-info">
            <div className="picture-area">
              <img src={gangstertalk} alt="죄송합니다 이미지를 불러오지 못했습니다." />
            </div>
            <div className="title">MERN SNS APP</div>
            <div className="contents">
              <br />
              참여 인원 : 4 명 <br />
              담당 업무 : WEB SOKCET, WEB RTC 구현,
              <br /> SERVER 배포
              <br />
              MERN(MongoDB, Express, ReactJS, NodeJS)로 구현한 SNS
              <br />
              Heroku로 배포하였습니다.
            </div>
            <a
              className="button"
              href="https://github.com/coolmarvel/MERN_SNS_APP"
            >
              github link
            </a>
            <a
              className="button"
              href="https://gangstertalk.herokuapp.com"
            >
              publish link
            </a>
          </div>
        </div>
        {/* 2번 */}
        <div className="portfolio-info-area">
          <div className="portfolio-info">
            <div className="picture-area">
              <img
                src={picker}
                alt="죄송합니다 이미지를 불러오지 못했습니다."
              />
            </div>
            <div className="title">Color Picker</div>
            <div className="contents">
              개인 프로젝트
              <br />
              <br />
              평소 웹 서핑을 하다가 색상 코드가 궁금한 경우가 있었는데 그런 경우
              그림판을 이용하거나 다른 프로그램을 이용하여 생삭 코드를 알아낼 수
              있지만 간편하지 않다고 생각이 되어 직접 만들었습니다.
            </div>
            <a
              className="button"
              href="https://github.com/hubblin/color-picker-vanilla"
            >
              github link
            </a>
            <a
              className="button"
              href="https://sad-heyrovsky-5a07d8.netlify.app/"
            >
              publish link
            </a>
          </div>
        </div>
        <div className="portfolio-info-area">
          <div className="portfolio-info">
            <div className="picture-area">
              <img src={note} alt="죄송합니다 이미지를 불러오지 못했습니다." />
            </div>
            <div className="title">Note app</div>
            <div className="contents">
              개인 프로젝트
              <br />
              <br />
              html, css, javascript를 공부하면서 익숙해지기 위해 홀로 실습해본
              노트 앱입니다. 위 세가지 기술만을 사용하였으며 디자인은
              핀터레스트를 참고했습니다.
            </div>
            <a
              className="button"
              href="https://github.com/hubblin/note_app_vanilla"
            >
              github link
            </a>
            <a
              className="button"
              href="https://mystifying-mayer-0e6bfd.netlify.app"
            >
              publish link
            </a>
          </div>
        </div>
        <div className="portfolio-info-area">
          <div className="portfolio-info">
            <div className="picture-area">
              <img
                src={pickup}
                alt="죄송합니다 이미지를 불러오지 못했습니다."
              />
            </div>
            <div className="title">커스텀 소품 쇼핑몰 시스템</div>
            <div className="contents">
              참여 인원: 3명
              <br />
              담당 업무 : 화면 UI 설계, 메인 화면, 쇼핑몰 화면, 주문 화면, 주문
              완료화면, 관리자 화면 구현, Fabric.js를 이용한 그림 커스텀 기능
              구현
              <br />
              <br />
              사용자가 고른 상품에 자신이 원하는 그림을 그리고 여러가지 효과를
              넣어 자신만의 그림이 들어간 상품을 살 수 있도록 도움을 주는 웹
              쇼핑몰 사이트 입니다.
            </div>
            <a className="button" href="https://github.com/hubblin/NodeProject">
              github link
            </a>
          </div>
        </div>
        <div className="portfolio-info-area">
          <div className="portfolio-info">
            <div className="picture-area">
              <img src={paint} alt="죄송합니다 이미지를 불러오지 못했습니다." />
            </div>
            <div className="title">Object Detection을 이용한 검색 기능</div>
            <div className="contents">
              개인 프로젝트 <br />
              <br /> Tensorflow에서 제공하는 Object Detection을 이용하여
              그림으로 원하는 옷을 표현하여 검색할 수 있는 검색 시스템을
              개발하였습니다.
            </div>{" "}
            <a
              className="button"
              href="https://github.com/hubblin/Final_frontend"
            >
              github link
            </a>
          </div>
        </div>
        <div className="portfolio-info-area">
          <div className="portfolio-info">
            <div className="picture-area">
              <img src={popol} alt="죄송합니다 이미지를 불러오지 못했습니다." />
            </div>
            <div className="title">COOLMARVEL.의 웹 포트폴리오</div>
            <div className="contents">
              개인 프로젝트 <br />
              <br /> 저를 소개하는 웹 페이지 입니다.
              <br /> React로 제작하였으며 about me, skills, portfolio
              <br /> 로 구성하였습니다.
            </div>
            <a
              className="button"
              href="https://github.com/coolmarvel/coolmarvel.github.io"
            >
              github link
            </a>
            <a className="button" href="https://coolmarvel.github.io/">
              publish link
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Portfolio;
