import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import AuthorImage from "../../images/author_thumbnail.jpg";
// import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

const HotCollections = () => {
  const [data, setData] = useState(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    loop: true,
    rtl: true,

    breakpoints: {
      "(max-width: 600px)": {
        slides: { perView: 1, spacing: 10, number: 6 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 3, spacing: 10, number: 6 },
      },
      "(min-width: 1400px)": {
        slides: { perView: 4, spacing: 10, number: 6 },
      },
    },

    slides: {
      perView: 2,
      spacing: 10,
      number: 6,
    },
  });

  const fetchApi = async () => {
    await axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      )
      .then(res => setData(res.data));
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {data && console.log(data)}
          <div className="navigation-wrapper">
            <div ref={sliderRef} className="keen-slider">
              {data &&
                data.map((item, index) => (
                  <div
                    className={`col-lg-3 col-md-6 col-sm-6 col-xs-12 keen-slider__slide number-slide${index} hot-collection__item`}
                    key={index}
                  >
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${item.authorId}`}>
                          <img
                            src={item.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img
                            className="lazy pp-coll"
                            src={item.authorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{item.title}</h4>
                        </Link>
                        <span>ERC-{item.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
              {loaded && instanceRef.current && (
                <>
                  <Arrow
                    left
                    onClick={e =>
                      e.stopPropagation() || instanceRef.current?.prev()
                    }
                    // disabled={currentSlide === 0}
                  />

                  <Arrow
                    onClick={e =>
                      e.stopPropagation() || instanceRef.current?.next()
                    }
                    // disabled={
                    //   currentSlide ===
                    //   instanceRef?.current.track.details.slides?.length - 1
                    // }
                  />
                </>
              )}
            </div>
            {loaded && instanceRef.current && (
              <div className="dots">
                {[
                  ...Array(
                    instanceRef.current.track.details.slides?.length
                  ).keys(),
                ].map(idx => {
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        instanceRef.current?.moveToIdx(idx);
                      }}
                      className={
                        "dot" + (currentSlide === idx ? " active" : "")
                      }
                    ></button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

function Arrow(props) {
  const disabeld = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}

export default HotCollections;
