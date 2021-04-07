import { storage } from '../../utils/firebase';
import React, { useEffect, useState } from 'react';
import './CarImage.css';

function CarImage(props) {
  const [url, setURL] = useState('');

  useEffect(() => {
    setURL(props.imageUrl);
  }, [props]);

  function handleImageChange(e) {
    storage
      .ref(`/images/${e.target.files[0].name}`)
      .put(e.target.files[0])
      .then((res) => {
        storage
          .ref('images')
          .child(e.target.files[0].name)
          .getDownloadURL()
          .then((url) => {
            setURL(url);
            props.setImage(url);
          });
      });
  }

  function deleteImage() {
    storage
      .refFromURL(url)
      .delete()
      .then(() => {
        setURL('');
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      {url ? (
        <div className="car-image">
          <img src={url} alt="" name="imageUrl" />
          <button type="button" onClick={deleteImage}>
            Delete Image
          </button>
        </div>
      ) : (
        <div className="uploadFile">
          <span className="filewrap">
            Upload Car Image
            <input type="file" onChange={handleImageChange} />
          </span>
        </div>
      )}
    </div>
  );
}

export default CarImage;
