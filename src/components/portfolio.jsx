import React, { memo } from "react";

import "../styles/portfolio.scss";
import mining from "../images/mining.png"
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
              팀 프로젝트
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
                src={mining}
                alt="죄송합니다 이미지를 불러오지 못했습니다."
              />
            </div>
            <div className="title">Blockchain 채굴 체험</div>
            <div className="contents">
              <br />
              팀 프로젝트
              <br />
              참여 인원 : 3 명 <br />
              담당 업무 : WEB SOKCET, Blockchain 구조 구현,
              <br /> SERVER 배포
              <br />
              blockChain에 대해 공부하고 Block구조 및 Transaction을
              <br />
              local환경에서 ws(webSocket)을 활용하여 체험해봤습니다.
              <br />
              heroku를 통해 배포를 하였지만 ws특성상 확인을 하려면 로컬로 실행해야
              <br />
              정상적으로 테스트 할 수 있는걸 확인하였습니다.
            </div>
            <a
              className="button"
              href="https://github.com/coolmarvel/mimicoin-app"
            >
              github link
            </a>
            {/* <a
              className="button"
              href="https://https://mimicoin-app.herokuapp.com/"
            >
              publish link
            </a> */}
          </div>
        </div>
        {/* 3번 */}
        <div className="portfolio-info-area">
          <div className="portfolio-info">
            <div className="picture-area">
              <img src={note} alt="죄송합니다 이미지를 불러오지 못했습니다." />
            </div>
            <div className="title">DAITZO-SHOP</div>
            <div className="contents">
              <br />
              팀 프로젝트<br />
              참여 인원 : 4 명 <br />
              담당 업무 : MERN(MongoDB, Express, React, NodeJS)
              <br />
              <br />
              학원에서 한 초창기 프로젝트로 React와 NodeJS(API), DB에 대해
              <br />
              공부하며 익숙해지기 위해 한 프로젝트입니다.
              <br />
              
            </div>
            <a
              className="button"
              href="https://github.com/coolmarvel/daitzo-shop"
            >
              github link
            </a>
            {/* <a
              className="button"
              href="https://mystifying-mayer-0e6bfd.netlify.app"
            >
              publish link
            </a> */}
          </div>
        </div>
        {/* 4번 */}
        {/* <div className="portfolio-info-area">
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
        </div> */}
        {/* 5번 */}
        {/* <div className="portfolio-info-area">
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
        </div> */}
        {/* 6번 */}
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
