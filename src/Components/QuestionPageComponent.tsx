import QuestionComponent from "./QuestionComponent";

type Question = {
  qnum: number;
  question: string;
  options: string[];
  answer: string;
};

type QuestionPageComponentProps = {
  questions: Question[];
  results: (boolean | null)[];
  currentIndex: number;
  score: number;
  finished: boolean;
  onNext: (selectedAnswer: string) => void;
  onRestart: () => void;
};

function QuestionPageComponent({
  questions,
  results,
  currentIndex,
  score,
  finished,
  onNext,
  onRestart,
}: QuestionPageComponentProps) {
  return (
    <>
      <div className="progress-section">
        <div className="progress-title">
          <strong>Progress:</strong>
          <span>
            {finished ? questions.length : currentIndex + 1} / {questions.length}
          </span>
        </div>

        <div className="progress-boxes">
          {results.map((result, index) => (
            <div
              key={index}
              className={`progress-box ${
                result === true
                  ? "correct"
                  : result === false
                    ? "wrong"
                    : !finished && index === currentIndex
                      ? "current"
                      : ""
              }`}
            >
              {result === true ? "✓" : result === false ? "✗" : index + 1}
            </div>
          ))}
        </div>
      </div>

      {finished ? (
        <section className="score-card">
          <p className="eyebrow">QUIZ FINISHED</p>
          <h1>Your Score</h1>
          <div className="score-number">
            {score}/{questions.length}
          </div>
          <p>You answered {score} questions correctly.</p>
          <button className="start-button" onClick={onRestart}>
            Try Again
          </button>
        </section>
      ) : (
        <QuestionComponent
          currQuestion={questions[currentIndex]}
          onNext={onNext}
        />
      )}
    </>
  );
}

export default QuestionPageComponent;
