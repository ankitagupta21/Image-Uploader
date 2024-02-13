import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

import "./Home.css";

function Home() {
  const location = useLocation();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const email = location.state.id;
  const name = location.state.name;

  const upload = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image")) {
      setImage(file);
      setPreview(URL.createObjectURL(file));

      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(
          "http://localhost:3000/home",
          formData
        );
        console.log(response);
        alert("Image uploaded successfully.");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      setImage(null);
      setPreview(null);
      alert("Please select an image file.");
    }
  };

  return (
    <div className="upload container">
      <div className="header">
        <div className="text">Welcome {location.state.name} !!</div>
      </div>
      <div className="u-input">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => upload(e)}
          onClick={(e) => (e.target.value = null)}
        />
        <div className="u-submit">
          <input type="submit" onClick={upload} value="Upload" />
        </div>
      </div>

      {preview && <img src={preview} alt="Preview" className="preview" />}
      <Link to="/" className="u-submit logout">
        Logout
      </Link>
    </div>
  );
}

export default Home;
