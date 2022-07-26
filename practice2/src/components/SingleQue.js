import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import styles from "./Question.module.css";

const SingleQue = (props) => {
  const navigate = useNavigate();
  const [isAnswerFilled, setIsAnswerFilled] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [selectedAns, setSelectedAns] = useState([]);

  const { data } = props;

  const submitFormHandler = (event) => {
    event.preventDefault();
    if (selectedAns[pageIndex]) {
      setIsAnswerFilled(true);
      if (pageIndex < 5) {
        setPageIndex((e) => e + 1);
      }
      if (pageIndex === 4) {
        navigate("/test/submit");
      }
    } else {
      setIsAnswerFilled(false);
    }
  };

  const handleOnChange = (e) => {
    // fetch(
    //   "https://mcqtest-project-default-rtdb.firebaseio.com/filled-answers.json",
    //   {
    //     method: "PATCH",
    //     body: JSON.stringify({ [`question${pageIndex + 1}`]: e.target.value }),
    //   }
    // );
  
    const stateToUpdate = [...selectedAns];
    stateToUpdate[pageIndex] = e.target.value;
    setSelectedAns(stateToUpdate);

    if(stateToUpdate.length === 5){
      fetch(
        "https://mcqtest-project-default-rtdb.firebaseio.com/filled-answers.json",
        {
          method: "PUT",
          body: JSON.stringify(stateToUpdate),
        }
      );
    }
  };

  const previousBtnHandler = () => {
    if (pageIndex > 0) {
      setPageIndex((e) => e - 1);
    }
  };

  return (
    <Fragment>
      {pageIndex < 5 && Object.keys(data[pageIndex]).length && (
        <form className={styles.questionForm} onSubmit={submitFormHandler}>
          <div>
            <h2>Question {pageIndex + 1}</h2>
          </div>
          <p>{data[pageIndex].question}</p>

          <div>
            <input
              type="radio"
              name="option"
              value="A"
              checked={selectedAns[pageIndex] === "A"}
              onChange={handleOnChange}
            />
            {data[pageIndex].options.a}
            <br />
            <input
              type="radio"
              name="option"
              value="B"
              checked={selectedAns[pageIndex] === "B"}
              onChange={handleOnChange}
            />
            {data[pageIndex].options.b}
            <br />
            <input
              type="radio"
              name="option"
              value="C"
              checked={selectedAns[pageIndex] === "C"}
              onChange={handleOnChange}
            />
            {data[pageIndex].options.c}
            <br />
            <input
              type="radio"
              name="option"
              value="D"
              checked={selectedAns[pageIndex] === "D"}
              onChange={handleOnChange}
            />
            {data[pageIndex].options.d}
          </div>
          {!isAnswerFilled ? (
            <p className={styles.errorText}>Please fill any one option</p>
          ) : (
            ""
          )}
          <div className={styles.actions}>
            <button type="button" onClick={previousBtnHandler}>
              Previous
            </button>
            <button type="submit">
              {pageIndex < 4 ? "Submit & Go Next" : "Submit Quiz"}
            </button>
          </div>
        </form>
      )}
    </Fragment>
  );
};

export default SingleQue;
