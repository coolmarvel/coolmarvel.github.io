import React, { memo } from "react";

import "../styles/portfolio.scss";
import mining from "../images/mining.png";
import gangstertalk from "../images/gangstertalk.png";
import popol from "../images/popol.png";
import shop from "../images/shop.png";
import nft from "../images/nft.png";

const Portfolio = memo(({ refs }) => {
  return (
    <section ref={refs} className="portfolio-section">
      <div className="section-title">PORTFOLIO</div>
      <div className="portfolio-content">
        <h3 className="portfolio-title">Blockchain</h3>
        <div className="portfolio-infos">
          {/* 1번 */}
          <div className="portfolio-info-area">
            <div className="portfolio-info">
              <div className="picture-area">
                <img src={nft} alt="죄송합니다 이미지를 불러오지 못했습니다." />
              </div>
              <div className="title">NFT Game Service Site</div>
              <div className="contents">
                <br />
                참여 인원: 3명
                <br />
                <br />
                담당 업무
                <br /> 전체적인 게임 점수 및 랭킹 구현, 통신을 담당,
                <br /> 개발 단계에서 발생한 이슈 및 에러 해결 위주 담당
                <br /> AWS EC2 배포
                <br />
                <br />
                <br />
                학원에서 기업(Acts29)과 연결해주어 진행한 협업으로 실무위주의
                경험을 쌓을 수 있었고 최근 각광받는 NFT기술스텍을 직접 접할 수
                있는 마지막 프로젝트입니다.
              </div>
              <a className="button" href="https://github.com/NamingCenter">
                Github
              </a>
              <a
                className="button"
                href="http://play-to-earn.s3-website.ap-northeast-2.amazonaws.com"
              >
                Publish
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
              <div className="title">Blockchain System 프로젝트</div>
              <div className="contents">
                <br />
                참여 인원 : 3 명
                <br />
                <br />
                담당 업무
                <br /> WS을 활용한 node들의 peer연결
                <br /> mining(채굴) 및 transaction(전송) 구현
                <br /> MySQL을 활용하여 Block(data)을 json으로 저장
                <br />
                <br />
                blockChain에 대해 공부하고 Block구조체 및 Transaction을
                <br />
                local환경에서 ws(webSocket)을 활용하여 체험해보는 학원에서의
                세번째 프로젝트입니다.
                <br />
                <br />
              </div>
              <a
                className="button"
                href="https://github.com/coolmarvel/mimicoin-app"
              >
                Github
              </a>
              {/* <a
              className="button"
              href="https://https://mimicoin-app.herokuapp.com/"
            >
              Publish
            </a> */}
            </div>
          </div>
        </div>

        <h3 className="portfolio-title">Web</h3>
        <div className="portfolio-infos">
          {/* 3번 */}
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
                참여 인원 : 4 명
                <br />
                <br />
                담당 업무
                <br /> WEB SOKCET, WEB RTC로 채팅 구현,
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
                Github
              </a>
              <a className="button" href="https://gangstertalk.herokuapp.com">
                Publish
              </a>
            </div>
          </div>

          {/* 4번 */}
          <div className="portfolio-info-area">
            <div className="portfolio-info">
              <div className="picture-area">
                <img
                  src={shop}
                  alt="죄송합니다 이미지를 불러오지 못했습니다."
                />
              </div>
              <div className="title">DAITZO-SHOP</div>
              <div className="contents">
                <br />
                참여 인원 : 4 명
                <br />
                <br />
                담당업무
                <br /> 학원 진도에 맞춰 지식 습득 및 스킬 숙련을 위한 파트를
                나누지 않고 팀원 전체가 MERN(MongoDB, Express, React, NodeJS)을
                기반으로 만들었습니다.
                <br />
                <br />
                학원에서 한 초창기 프로젝트로 React와 NodeJS(API), DB에 대해
                <br />
                공부하며 익숙해지기 위해 한 첫번째 프로젝트입니다.
                <br />
                <br />
              </div>
              <a
                className="button"
                href="https://github.com/coolmarvel/daitzo-shop"
              >
                Github
              </a>
              {/* <a
              className="button"
              href="https://mystifying-mayer-0e6bfd.netlify.app"
            >
              Publish
            </a> */}
            </div>
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
              Github
            </a>
          </div>
        </div> */}

        {/* 6번 */}
        {/* <div className="portfolio-info-area">
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
              Github
            </a>
            <a className="button" href="https://coolmarvel.github.io/">
              Publish
            </a>
          </div>
        </div> */}
      </div>
    </section>
  );
});

export default Portfolio;
