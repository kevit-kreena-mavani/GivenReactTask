import { useEffect, useState } from "react";
import SingleQue from "../components/SingleQue";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const Test = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState({});

  const fetchQuestionData = async () => {
    setIsLoading(true);
    const response = await fetch(
      "https://mcqtest-project-default-rtdb.firebaseio.com/questions.json"
    );

    const questionData = await response.json();

    if (props.language === "hindi") {
      setQuestions(questionData.hindi);
    } else if(props.language === "english"){
      setQuestions(questionData.english);
    }else{
      setQuestions(questionData.english);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchQuestionData();
  }, []);



  return (
    <div>
      {!isLoading && Object.keys(questions).length && (
        <SingleQue data={questions} ></SingleQue>
      )}
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default Test;
