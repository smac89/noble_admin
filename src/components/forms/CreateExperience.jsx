import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./styles.css";

const CreateExperience = () => {
  const [values, setValues] = useState({
    jobTitle: "",
    company: "",
    summary: "",
    startDate: "",
    finishDate: "",
    error: "",
    redirectTo: false,
    loading: false,
  });

  const {
    jobTitle,
    company,
    summary,
    startDate,
    finishDate,
    redirectTo,
    loading,
  } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `http://localhost:3002/api/v1/experience`,
      data: {
        jobTitle,
        company,
        summary,
        startDate,
        finishDate,
      },
    })
      .then((res) => {
        if ((res.data.status = "success")) {
          setValues({
            ...values,
            jobTitle: "",
            company: "",
            summary: "",
            startDate: "",
            finishDate: "",
            loading: false,
            redirectTo: true,
          });
        }
      })
      .catch((err) => {
        setValues({ ...values, error: err });
      });
  };

  const handleChange = (name) => (event) => {
    event.preventDefault();
    setValues({ ...values, [name]: event.target.value });
  };

  const showLoading = () => {
    if (loading) {
      return (
        <div className="spinner-border text-info" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );
    }
  };

  const redirectUser = () => {
    if (redirectTo) {
      return <Redirect to="/experience" />;
    }
  };

  const form = () => (
    <div className="mb-5 d-flex justify-content-center">
      <div className="card mt-5 md-2" style={{ width: "30rem" }}>
        <center>{showLoading()}</center>
        <h5 className="card-header text-center text">Create Experience</h5>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label className="text">Job title</label>
              <input
                type="text"
                className="form-control"
                placeholder="job title..."
                required=""
                value={jobTitle}
                onChange={handleChange("jobTitle")}
              />
            </div>
            <div className="form-group">
              <label className="text">Company</label>
              <input
                type="text"
                className="form-control"
                placeholder="enter company name"
                required=""
                value={company}
                onChange={handleChange("company")}
              />
            </div>
            <div className="form-group">
              <label className="text">Summary</label>
              <textarea
                className="form-control"
                placeholder="enter experience summary"
                required=""
                value={summary}
                onChange={handleChange("summary")}
                rows="3"
              ></textarea>
            </div>
            <div className="form-group">
              <label className="text">Start date</label>
              <input
                type="text"
                className="form-control"
                placeholder="enter start date"
                required=""
                value={startDate}
                onChange={handleChange("startDate")}
              />
            </div>
            <div className="form-group">
              <label className="text">Finish date</label>
              <input
                type="text"
                className="form-control"
                placeholder="enter finish date"
                required=""
                value={finishDate}
                onChange={handleChange("finishDate")}
              />
            </div>
          </form>
          <center>
            <button
              onClick={handleSubmit}
              type="submit"
              className="btn btn-outline-secondary text"
            >
              Share
            </button>
          </center>
        </div>
      </div>
    </div>
  );

  return (
    <div className="parent">
      {redirectUser()}
      {form()}
    </div>
  );
};

export default CreateExperience;
