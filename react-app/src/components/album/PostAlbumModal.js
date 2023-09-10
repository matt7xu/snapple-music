import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as albumActions from "../../store/album";
import { useHistory } from "react-router-dom";
import "./Album.css";

function PostAlbumModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [album_name, setAlbum_name] = useState("");
  const [genre, setGenre] = useState("");
  const [release_year, setRelease_year] = useState("");
  const [description, setDescription] = useState("");
  const [album_image_url, setAlbum_image_url] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("album_name", album_name);
    formData.append("genre", genre);
    formData.append("release_year", release_year);
    formData.append("description", description);
    formData.append("album_image_url", album_image_url);

    if (checkImage(album_image_url)) {
      setErrors(["Image URL must end in .png, .jpg, or .jpeg"])
      return
    } else {
      await dispatch(albumActions.addAlbumThunk(formData));
      history.push("/albums/owned");
    }
  }

  const checkImage = (urlString) => {
    const endings = ["png", "jpg", "jpeg"];
    const array = urlString.split(".");
    if (endings.includes(array[array.length - 1])) {
      return false;
    }
    return true;
  }

  return (
    <div className="pageContainers">
      <h1>Create New Album</h1>
      <form onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <ul>
        {errors.length > 0 && errors.map(el => (
          <div key={el} className="errors">{el}</div>
        ))}
        </ul>
        <div>
          <label>
            Album Name
            <input
              type="text"
              value={album_name}
              onChange={(e) => setAlbum_name(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Genre
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Release Year
            <input
              type="text"
              value={release_year}
              onChange={(e) => setRelease_year(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Description
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Album Image Url
            <input
              type="text"
              value={album_image_url}
              onChange={(e) => setAlbum_image_url(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default PostAlbumModal;
