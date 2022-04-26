import Carousel from "react-bootstrap/Carousel";

const View = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <div className="images">
          <div className="row">
            <div className="col-md-4 col-lg-4 image">
              <div className="image-box ss1">
                {/* <Image smallImage="img/images/M9E-MasterFile.1945.png" /> */}
              </div>
            </div>
            <div className="col-md-4 col-lg-4 image">
              <div className="image-box ss2"></div>
            </div>
            <div className="col-md-4 col-lg-4 image">
              <div className="image-box ss3"></div>
            </div>
            <div className="col-md-4 col-lg-4 image">
              <div className="image-box ss4"></div>
            </div>
            <div className="col-md-4 col-lg-4 special-img image">
              <div className="image-box ss5"></div>
            </div>
            <div className="col-md-4 col-lg-4 image">
              <div className="image-box ss6"></div>
            </div>
            <div className="col-md-4 col-lg-4 image">
              <div className="image-box ss7"></div>
            </div>
            <div className="col-md-4 col-lg-4 image">
              <div className="image-box ss8"></div>
            </div>
            <div className="col-md-4 col-lg-4 image">
              <div className="image-box ss9"></div>
            </div>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};
export default View;
