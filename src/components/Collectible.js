import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
const Collectible = ({ val }) => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const getImage = async () => {
    const fetch = await axios(val.data.uri);
    setName(fetch.data.name);
    setDescription(fetch.data.description);
    setImage(fetch.data.image);
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
          <h3>Name</h3>
          <p className="mt-1">{name}</p>
          <h3>Description</h3>
          <p>{description}</p>
          <h6 className=" mt-2">{val.data.description}</h6>
          <h5>Creators</h5>
          {val.data.creators.map((creator, index) => (
            <p key={index}>{creator.address}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collectible;
