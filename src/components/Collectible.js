import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
const Collectible = ({ val }) => {
  const [image, setImage] = useState(null);
  const getImage = async () => {
    const fetch = await axios(val.data.uri);
    const image = fetch.data.image;
    setImage(image);
  };
  useEffect(() => {
    getImage();
  }, []);

  return (
    <div className="col-4 mt-3">
      <div className="cart text-center">
        <div className="img mt-4 pt-3">
          <img
            src={image}
            className="rounded float-start w-100"
            alt="loading..."
          />
          <p className="mt-1">{val.data.name}</p>
          <h6 className=" mt-2">{val.data.description}</h6>
        </div>
      </div>
    </div>
  );
};

export default Collectible;
