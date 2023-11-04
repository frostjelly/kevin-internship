import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const NewItems = () => {
  const [data, setData] = useState(null);

  const fetchApi = async () => {
    await axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      )
      .then(res => setData(res.data));
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {data && (
            <OwlCarousel
              className="owl-theme"
              dotsEach
              loop
              nav
              margin={10}
              items={4}
              responsive={{
                1200: { items: 4 },
                980: { items: 3 },
                535: { items: 2 },
                0: { items: 1 },
              }}
            >
              {data.map((item, index) => (
                <div className="" key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="de_countdown">5h 30m 32s</div>

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to="/item-details">
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">{item.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}

          {data && (
            <OwlCarousel
              className="owl-theme"
              dotsEach
              loop
              nav
              margin={10}
              items={4}
              responsive={{
                1200: { items: 4 },
                980: { items: 3 },
                535: { items: 2 },
                0: { items: 1 },
              }}
            >
              {new Array(7).fill(0).map((_, index) => (
                <div className="" key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp  skeleton-avatar">
                      <Link to="/author ">
                        <div className="skeleton-box lazy pp-coll skeleton-avatar"></div>
                        <img className="lazy pp-coll" src="" alt="" />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>

                    <div className="author_list_pp skeleton-box skeleton-text skeleton-avatar rounded-circle w-25 h-25">
                      <Link
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img
                          className="lazy w-25 h-25  skeleton-avatar skeleton-box skeleton-text"
                          src=""
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div
                      className="skeleton-box skeleton-text"
                      style={{ textAlign: "end" }}
                    >
                      {/* 5h 30m 32s */}
                    </div>

                    <div className="nft__item_wrap">
                      <div className="skeleton-box w-100 h-75"></div>
                    </div>
                    <div className="nft__item_info">
                      <h4 className="skeleton-box skeleton-text">
                        Pinky Ocean
                      </h4>
                      <div className="nft__item_price skeleton-box skeleton-text">
                        3.08 ETH
                      </div>
                      <div className="nft__item_like">
                        <i className="skeleton-box skeleton-text">6911</i>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
