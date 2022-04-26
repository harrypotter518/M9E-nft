import { useState, useLayoutEffect } from "react";
import silhouette from "../../assets/images/M9E SILHOUETTE.png";
import nine from "../../assets/images/9x999.png";
import View from "../view_image";
import ViewResponse from "../view_response_image";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export const Features = (props) => {
  const [width, height] = useWindowSize();

  return (
    <div id="features" className="text-center">
      <div className="container">
        <div>
          <img src={silhouette} className="silhouette" alt="silhouette"></img>
          <p className="mini">NINE COLLECTIONS OF NINEHUNDRED NINETY NINE</p>
          <img src={nine} className="nine" alt="nine"></img>
          <div className="section-content">
            <div className="row">
              <div className="col-lg-6">
                <p className="justify nine-comment"> // THE NUMBER NINE </p>
                <p className="justify description">
                  The number nine is a very iconic element in the Daytoner
                  universe. Nine is an amazing and very unique number culturally
                  but also mathematically. In some way nine is the highest of
                  all numbers, because everything after that is just
                  combinations of lower numbers. In that sense it symbolises a
                  final frontier. The digital space gives us the chance to
                  explore M9Ξ designs that are not physically manufacturable and
                  opens up possibilities to sell digital and maybe even physical
                  one offsinspired by those new M9Ξ creations.
                </p>
              </div>
              <div className="col-lg-6">
                <p className="justify nine-collection">9 COLLECTIONS OF</p>
                <p className="justify nine-unique">999 UNIQUE M9Ξ</p>
                <p className="justify2 description">
                  There will be 9 collections of 999 generatively created unique
                  M9Ξs. Each collection has one characteristic digital driven
                  theme. The original M9E design for these collections is
                  designed by Daytoner to ensure the best source design. There
                  will be certain continuous elements running through all 9
                  collections to connect them with one another. For us the
                  digital space is a place which opens up our creative minds,
                  inspires us and could lead to unique physical M9Es.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="carousel">{width < 768 ? <ViewResponse /> : <View />}</div>
    </div>
  );
};
