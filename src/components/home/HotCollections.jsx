import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import axios from "axios";

const HotCollections = () => {
  const [data, setData] = useState(null);

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
          {!data && (
            <OwlCarousel
              className="owl-theme  "
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
              {new Array(6).fill(0).map((_, index) => (
                <div className="" key={index}>
                  <div className="nft_coll">
                    <div className="skeleton-box nft_wrap">
                      <Link to="/item-details">
                        <img src="" className="lazy img-fluid" alt="" />
                      </Link>
                    </div>
                    <div className="nft_coll_pp skeleton-avatar">
                      <Link to="/author ">
                        <div className="skeleton-box lazy pp-coll skeleton-avatar"></div>
                        <img className="lazy pp-coll" src="" alt="" />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info center-x">
                      <Link to="/explore">
                        <h4 className="skeleton-box skeleton-text m-1">
                          Pinky Ocean
                        </h4>
                      </Link>
                      <span className="skeleton-box skeleton-text">
                        ERC-192
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
          {data && (
            <OwlCarousel
              className="owl-theme  "
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
              {data?.map((item, index) => (
                <div className={`item`} key={index}>
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
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
