import { useState } from "react";
import QuestionPageComponent from "./QuestionPageComponent";

type Question = {
  qnum: number;
  question: string;
  options: string[];
  answer: string;
};

const questions: Question[] = [
  {
    qnum: 1,
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "Paris",
  },
  {
    qnum: 2,
    question: "Which language is commonly used for web development?",
    options: ["Python", "Java", "C++", "JavaScript"],
    answer: "JavaScript",
  },
  {
    qnum: 3,
    question: "Who developed the theory of relativity?",
    options: ["Newton", "Einstein", "Galileo", "Tesla"],
    answer: "Einstein",
  },
  {
    qnum: 4,
    question: "Which HTML element is used to create a hyperlink?",
    options: ["<p>", "<a>", "<img>", "<div>"],
    answer: "<a>",
  },
  {
    qnum: 5,
    question: "Which CSS property changes the text color?",
    options: ["background", "font-style", "color", "text-size"],
    answer: "color",
  },
  {
    qnum: 6,
    question: "Which React hook is used to manage state?",
    options: ["useEffect", "useState", "useMap", "useFetch"],
    answer: "useState",
  },
  {
    qnum: 7,
    question:
      "Which JavaScript method is commonly used to create a new array from each item in an array?",
    options: ["map()", "find()", "push()", "pop()"],
    answer: "map()",
  },
  {
    qnum: 8,
    question: "Which command starts a Vite development server?",
    options: [
      "npm run dev",
      "npm run start",
      "npm run test",
      "npm run preview",
    ],
    answer: "npm run dev",
  },
  {
    qnum: 9,
    question: "Which language is mainly used to style a webpage?",
    options: ["HTML", "CSS", "SQL", "C#"],
    answer: "CSS",
  },
  {
    qnum: 10,
    question: "Which symbol is used for a single-line comment in JavaScript?",
    options: ["#", "//", "<!-- -->", "**"],
    answer: "//",
  },
];

function PageComponent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<(boolean | null)[]>(
    Array(questions.length).fill(null),
  );
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleNext = (selectedAnswer: string) => {
    const currentQuestion = questions[currentIndex];
    const isCorrect = selectedAnswer === currentQuestion.answer;

    setResults((previous) => {
      const updated = [...previous];
      updated[currentIndex] = isCorrect;
      return updated;
    });

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((previous) => previous + 1);
    } else {
      setFinished(true);
    }
  };

  const startQuiz = () => {
    setStarted(true);
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setResults(Array(questions.length).fill(null));
    setStarted(false);
    setFinished(false);
  };

  const score = results.filter((result) => result === true).length;

  if (!started) {
    return (
      <main className="page start-page">
        <section className="start-card">
          <p className="eyebrow">QUIZ APP</p>
          <h1>Test Your Knowledge</h1>
          <p>Answer 10 questions and see your score at the end.</p>
          <button className="start-button" onClick={startQuiz}>
            Start Quiz
          </button>
        </section>
      </main>
    );
  }

  if (finished) {
    return (
      <main className="page">
        <section className="quiz-shell">
          <QuestionPageComponent
            questions={questions}
            results={results}
            currentIndex={currentIndex}
            score={score}
            finished={true}
            onNext={handleNext}
            onRestart={restartQuiz}
          />
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="quiz-shell">
        <QuestionPageComponent
          questions={questions}
          results={results}
          currentIndex={currentIndex}
          score={score}
          finished={false}
          onNext={handleNext}
          onRestart={restartQuiz}
        />
      </section>
    </main>
  );
}

export default PageComponent;
