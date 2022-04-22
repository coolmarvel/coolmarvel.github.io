import React, { memo } from "react";

import "../styles/portfolio.scss";
import mining from "../images/mining.png";
import gangstertalk from "../images/gangstertalk.png";
import popol from "../images/popol.png";
import shop from "../images/shop.png";

const Portfolio = memo(({ refs }) => {
  return (
    <section ref={refs} className="portfolio-section">
      <div className="section-title">PORTFOLIO</div>
      <div className="portfolio-content">
        {/* 1번 */}
        <div className="portfolio-info-area">
          <div className="portfolio-info">
            <div className="picture-area">
              <img src={shop} alt="죄송합니다 이미지를 불러오지 못했습니다." />
            </div>
            <div className="title">DAITZO-SHOP</div>
            <div className="contents">
              <br />
              팀 프로젝트
              <br />
              참여 인원 : 4 명 <br />
              담당 업무 : 학원 진도에 맞춰 지식 습득 및 스킬 숙련을 위한 파트를
              나누지 않고 팀원 전체가 MERN(MongoDB, Express, React, NodeJS)을
              기반으로 만들었습니다.
              <br />
              <br />
              학원에서 한 초창기 프로젝트로 React와 NodeJS(API), DB에 대해
              <br />
              공부하며 익숙해지기 위해 한 첫번째 프로젝트입니다.
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

        {/* 2번 */}
        <div className="portfolio-info-area">
          <div className="portfolio-info">
            <div className="picture-area">
              <img
                src={gangstertalk}
                alt="죄송합니다 이미지를 불러오지 못했습니다."
              />
            </div>
            <div className="title">MERN SNS APP</div>
            <div className="contents">
              <br />
              팀 프로젝트 참여 인원 : 4 명 <br />
              담당 업무 : WEB SOKCET, WEB RTC로 채팅 구현,
              <br /> Redux를 활용한 State 관리 구현
              <br /> Heroku SERVER 배포를 통해 Local환경 밖에서의 구동 구현
              <br />
              <br />
              MERN(MongoDB, Express, ReactJS, NodeJS)로 학원에서 배웠던
              기술스텍을 활용하여 두번째로 진행 구현한 SNS 플랫폼으로
              인스타그램을 참고하여 만들었습니다.
            </div>
            <a
              className="button"
              href="https://github.com/coolmarvel/MERN_SNS_APP"
            >
              github link
            </a>
            <a className="button" href="https://gangstertalk.herokuapp.com">
              publish link
            </a>
          </div>
        </div>

        {/* 3번 */}
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
              담당 업무 : WEB SOKCET(WS)을 활용한 node들의 peer연결을 통해
              mining(채굴) 및 transaction 전송 구현, Blockchain 구조에서
              merkle과 Hash의 임의값을 직접 설정하여 pending속도 조절
              <br /> MySQL(DB)을 활용하여 Block(data)의 구조에서 data를
              json형태를 활용해 더욱 쉽게 접하고 경험할 수 있었습니다.
              <br />
              <br />
              blockChain에 대해 공부하고 Block구조체 및 Transaction을
              <br />
              local환경에서 ws(webSocket)을 활용하여 체험해보는 학원에서의
              세번째 프로젝트입니다.
              <br />
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
        {/* 4번 */}
        <div className="portfolio-info-area">
          <div className="portfolio-info">
            <div className="picture-area">
              <img src={shop} alt="죄송합니다 이미지를 불러오지 못했습니다." />
            </div>
            <div className="title">NFT Game Service Site</div>
            <div className="contents">
              참여 인원: 3명
              <br />
              담당 업무 : 게임 파트에서 전체적인 게임 및 통신을 담당하여 점수
              등록 및 랭킹 구현, emailJs를 활용하여 유저와의 contact 구현, 개발
              단계에서 발생할 이슈 및 에러 해결 위주 담당
              <br />
              <br />
              <br />
              학원에서 기업(Acts29)과 연결해주어 진행한 협업으로 실무위주의
              경험을 쌓을 수 있었고 최근 각광받는 NFT기술스텍을 직접 접할 수
              있는 마지막 프로젝트입니다.
            </div>
            <a className="button" href="https://github.com/NamingCenter">
              github link
            </a>
          </div>
        </div>
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
