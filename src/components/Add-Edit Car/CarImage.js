import { storage } from '../../utils/firebase';
import React, { useEffect, useState } from 'react';
import useAPIUser from '../../hooks/useAPIUser';
import './CarImage.css';
import useAPIError from '../../hooks/useAPIError';

function CarImage(props) {
  const [url, setURL] = useState('');
  const { user } = useAPIUser();
  const { addError } = useAPIError;

  useEffect(() => {
    setURL(props.image);
  }, [props.image]);

  function handleImageChange(e) {
    storage
      .ref(`/images/${user.user.uid}/${e.target.files[0].name}`)
      .put(e.target.files[0])
      .then((res) => {
        storage
          .ref(`images/${user.user.uid}/`)
          .child(e.target.files[0].name)
          .getDownloadURL()
          .then((url) => {
            setURL(url);
          })
          .catch((err) => {
            addError(err.message);
          });
      })
      .catch((err) => {
        addError(err.message);
      });
  }

  function deleteImage() {
    storage
      .refFromURL(url)
      .delete()
      .then(() => {
        setURL('');
      })
      .catch((err) => {
        addError(err.message);
      });
  }

  return (
    <div>
      {' '}
      {url ? (
        <div className="car-image">
          <div className="car-data-img-wrapper">
            <img src={url} alt="" name="imageUrl" />
          </div>{' '}
          <button type="button" onClick={deleteImage}>
            Delete Image{' '}
          </button>{' '}
        </div>
      ) : (
        <div className="uploadFile">
          <span className="filewrap">
            Upload Car Image <input type="file" onChange={handleImageChange} />{' '}
          </span>{' '}
        </div>
      )}{' '}
    </div>
  );
}

export default CarImage;
