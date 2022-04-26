import arrow from "../../assets/images/arrow.png";
import triangle from "../../assets/images/triangle2.jpg";
import triangle2 from "../../assets/images/triangle3.jpg";

export const Roadmap = (props) => {
  return (
    <div id="roadmap" className="text-center">
      <div className="container">
        <div className="roadmap2021">
          <h1>
            <img src={arrow} className="arrow-icon" alt="arrow-icon"></img>
            ROADMAP
          </h1>
          <div className="roadmap2021-main">
            <div className="point-1">
              <div className="gradiant"></div>
              <div className="absolute1">
                <img src={triangle2} alt="triangle2"></img>
                <h2>11/12</h2>
              </div>
              <div className="absolute2">
                <img src={triangle2} alt="triangle2"></img>
                <h2>11/14</h2>
              </div>
              <div className="absolute3">
                <h3>DESIGNERCON</h3>
                <p style={{ margin: 0 }}>9 M9Ξ 1:1</p>
              </div>
            </div>
            <div className="point-4">
              <img src={triangle} alt="triangle"></img>
              <h2>12/09</h2>
              <h3>COLLECTION 1</h3>
              <p style={{ margin: 0 }}>MINT OPEN</p>
            </div>
            <div className="point-5">
              <img src={triangle} alt="triangle"></img>
              <h2>12/19</h2>
              <h3>COLLECTION 2</h3>
              <h3 style={{ margin: 0 }}>REVEALED</h3>
            </div>
          </div>
        </div>
        <div className="roadmap2022">
          <div className="roadmap2022-h">
            <h1>
              <img src={arrow} className="arrow-icon" alt="arrow-icon"></img>
              WHAT ABOUT 2022
            </h1>
            <p>
              <span>AND AFTER</span>(TILL 2030)
            </p>
          </div>
          <div className="roadmap2022-main">
            <div className="point-0">
              <img src={triangle2} alt="triangle"></img>
              <h2>2022</h2>
              <h3>COLLECTION 3-9</h3>
              <h3 style={{ margin: 0 }}>TO BE CONTINUED</h3>
            </div>
            <div className="point-1">
              <img src={triangle} alt="triangle"></img>
              <h2>02/09</h2>
              <h3>M9Ξ</h3>
              <h3 style={{ margin: 0 }}>ANNIVERSARY</h3>
              <div className="group1">
                <div className="content">
                  <img
                    src={arrow}
                    className="arrow-icon-mini"
                    alt="arrow-icon-mini"
                  ></img>
                  <h4>EVENT AND GIVEWAY</h4>
                </div>
              </div>
              <div className="group2">
                <div className="content">
                  <img
                    src={arrow}
                    className="arrow-icon-mini"
                    alt="arrow-icon-mini"
                  ></img>
                  <h4>1 UNIQUE NFT AUCTIONED</h4>
                  <h4> FOR 9 HOURS AND 9 MINS.</h4>
                </div>
              </div>
            </div>
            <div className="point-2">
              <img src={triangle} alt="triangle"></img>
              <h2>06/09</h2>
              <h3>SPECIAL</h3>
              <h3 style={{ margin: 0 }}>COLLECTION*</h3>
              <div className="group3">
                <p>*Token holders only</p>
              </div>
            </div>
            <div className="point-3">
              <img src={triangle} alt="triangle"></img>
              <h2>09/09</h2>
              <h3>M9Ξ DAY</h3>
              <div className="group1">
                <div className="content">
                  <img
                    src={arrow}
                    className="arrow-icon-mini"
                    alt="arrow-icon-mini"
                  ></img>
                  <h4>EVENT</h4>
                </div>
              </div>
              <div className="group2">
                <div className="content">
                  <img
                    src={arrow}
                    className="arrow-icon-mini"
                    alt="arrow-icon-mini"
                  ></img>
                  <h4>MERCH*</h4>
                </div>
              </div>
              <div className="group2">
                <div className="content">
                  <img
                    src={arrow}
                    className="arrow-icon-mini"
                    alt="arrow-icon-mini"
                  ></img>
                  <h4>1 PHYSICAL REVEAL</h4>
                </div>
              </div>
              <div className="group3">
                <p>*Token holders only</p>
              </div>
            </div>
          </div>
        </div>
        <div className="roadmap-b">
          <div className="row">
            <div className="roadmap-b-left col-md-6">
              <h1>
                <img src={arrow} className="arrow-icon" alt="arrow-icon"></img>
                AND MORE
              </h1>
              <h1>TO BUILD</h1>
            </div>
            <div className="roadmap-b-right col-md-6">
              <p>M9Ξ X ARTISTS LINE</p>
              <p>M9Ξ TRANSMEDIA</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
