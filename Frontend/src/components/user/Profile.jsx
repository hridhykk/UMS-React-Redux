import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showToastMessage } from '../../validation/Toast';
import { addImage, profileEdit } from '../../redux/userRedux/userThunk';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
  const [data, setData] = useState({});
  const [image, setImage] = useState(null);
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({});
  const [mobile, setMobile] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((store) => store.userSlice.data);

  useEffect(() => {
    if (user) {
      setData(user);
      setFormData(user);
    }
  }, [user]);

  useEffect(() => {
    if (image) {
      dispatch(addImage({ image, userId: user._id }));
     
    }
  }, [image]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function submit() {
    let mobileTrim = formData.mobile.trim();
    const mobileRegex = /^(91)?0?[6-9]\d{9}$/;
    if (formData.name.trim() === '' || mobileTrim === '') {
      showToastMessage('All fields are required', 'error');
    } else if (!mobileRegex.test(mobileTrim)) {
      showToastMessage('Invalid Mobile', 'error');
    } else {
      dispatch(profileEdit({ formData, userId: user._id }));
      
      setEdit(false);
    }
  }

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <ToastContainer />
        <div
          className="bg-light shadow-lg p-5 rounded d-flex flex-column align-items-center"
          style={{ backgroundColor: 'rgba(128, 128, 128, 0.5)', width: '500px' }}
        >
          <h1 className="text-center mb-4" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
           Your Profile Page
          </h1>

          <div className="position-relative mb-4">
            <img
              src={`/userImage/${data.image}`}
              alt="Profile"
              className="rounded-circle img-fluid"
              style={{ width: '200px', height: '200px', objectFit: 'cover' }}
            />
            <button
              className="btn btn-link position-absolute bottom-0 end-0 p-0"
              style={{ backgroundColor :'#ccc' }}
              onClick={() => document.getElementById('fileInput').click()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="bi bi-camera-fill"
                style={{ width: '24px', height: '24px' }}
              >
                <path
                  fill="#fff"
                  d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"
                />
              </svg>
            </button>
            <input
              type="file"
              id="fileInput"
              className="d-none"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          {edit === false ? (
            <div
              className="text-center w-100 p-4 rounded"
              style={{ backgroundColor: 'rgba(128, 128, 128, 0.5)' }}
            >
              <h2 className="text-2xl font-semibold d-flex justify-content-between">
                {data.name}
                <button
                  className="btn btn-link p-0"
                  onClick={() => setEdit(!edit)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="bi bi-pencil-fill"
                    style={{ width: '20px', height: '20px' }}
                  >
                    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                  </svg>
                </button>
              </h2>
              <p className="text-muted">Mobile: {data.mobile}</p>
              <p className="text-muted">Email: {data.email}</p>
            </div>
          ) : (
            <div className="w-100">
              <div className="mb-3">
                <label className="form-label">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Mobile:</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={(e) => {
                    handleChange(e);
                    setMobile(e.target.value);
                  }}
                  className="form-control"
                />
              </div>

              <button
                className="btn btn-secondary"
                onClick={() => submit()}
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>

      
    </>
  );
};

export default Profile;
