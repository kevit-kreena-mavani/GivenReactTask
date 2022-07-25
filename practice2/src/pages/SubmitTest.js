import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/UI/Card";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import styles from "./SubmitTest.module.css";

const SubmitTest = (props) => {
  const navigate = useNavigate();
  const [answers, getAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  let trueCount = 0;

  const trueAnswers = ["D", "D", "C", "A", "A"];

  const fetchSubmittedAnswer = async () => {
    setIsLoading(true);
    const response = await fetch(
      "https://mcqtest-project-default-rtdb.firebaseio.com/filled-answers.json"
    );
    const answers = await response.json();

    const filledAnswers = Object.values(answers);

    getAnswers(filledAnswers);

    setIsLoading(false);
  };
  if (answers.length === trueAnswers.length) {
    answers.map(function (value, index) {
      if (value === trueAnswers[index]) {
        trueCount++;
      }
    });
  }

  useEffect(() => {
    fetchSubmittedAnswer();
  }, [SubmitTest]);


  const closeHandler = () => {
    navigate("/user-detail");
    props.reset();
  };
  return (
    <Card>
      <div className={styles.report}>
        <header>
          <h1>Report Card</h1>
          <h2>
            Score : <span className={styles.count}>{trueCount}</span> / 5
          </h2>
        </header>
        <div>
          <h3>Name : {props.userData.name}</h3>
          <h3>Language : {props.userData.language}</h3>
        </div>

        {!isLoading &&
          answers.length === trueAnswers.length &&
          answers.map((value, index) => {
            if (value === trueAnswers[index]) {
              return (
                <p key={index + 1} className={styles.trueText}>
                  Question {index + 1} : {value}
                </p>
              );
            } else {
              return (
                <p key={index + 1} className={styles.falseText}>
                  Question {index + 1} : {value}
                </p>
              );
            }
          })}
        {isLoading && <LoadingSpinner />}
        <button onClick={closeHandler}>Close</button>
      </div>
    </Card>
  );
};
export default SubmitTest;
