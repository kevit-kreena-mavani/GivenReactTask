import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import styles from "./Question.module.css";

const SingleQue = (props) => {
  const navigate = useNavigate();
  const [isAnswerFilled, setIsAnswerFilled] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);

  const { data } = props;

  const submitFormHandler = (event) => {
    event.preventDefault();

    const answerOfEach = event.target.option.value;

    const updatedData = { [`question${pageIndex + 1}`]: answerOfEach };

    fetch(
      "https://mcqtest-project-default-rtdb.firebaseio.com/filled-answers.json",
      {
        method: "PATCH",
        body: JSON.stringify(updatedData),
      }
    );

    if (answerOfEach.length !== 0) {
      setIsAnswerFilled(true);
      if (pageIndex < 5) {
        setPageIndex((e) => e + 1);
        event.target.reset()
      }
    } else {
      setIsAnswerFilled(false);
    }
  };

  if (pageIndex === 5) {
    navigate("/test/submit");
  }

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
            <input type="radio" name="option" value="optionA" />
            {data[pageIndex].options.a}
            <br />
            <input type="radio" name="option" value="optionB" />
            {data[pageIndex].options.b}
            <br />
            <input type="radio" name="option" value="optionC" />
            {data[pageIndex].options.c}
            <br />
            <input type="radio" name="option" value="optionD" />
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
