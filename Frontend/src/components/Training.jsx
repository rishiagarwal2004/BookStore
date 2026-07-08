import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEnroll } from "../context/EnrollProvider";

// A tiny static practice-question bank, keyed by course name.
// Extend this object (or fetch from the backend) to add more practice content.
const PRACTICE_BANK = {
  "React JS": [
    {
      q: "Which hook is used to manage state in a function component?",
      options: ["useEffect", "useState", "useRef", "useMemo"],
      answer: 1,
    },
    {
      q: "What does JSX stand for?",
      options: ["JavaScript XML", "Java Syntax Extension", "JSON XML", "None"],
      answer: 0,
    },
    {
      q: "Which hook runs side effects in React?",
      options: ["useState", "useEffect", "useMemo", "useContext"],
      answer: 1,
    },
    {
      q: "Which hook is used to access Context values?",
      options: ["useReducer", "useContext", "useRef", "useEffect"],
      answer: 1,
    },
    {
      q: "Which hook stores a mutable value without causing re-renders?",
      options: ["useState", "useRef", "useMemo", "useCallback"],
      answer: 1,
    },
    {
      q: "What is the default file extension for React components using JSX?",
      options: [".jsx", ".java", ".json", ".css"],
      answer: 0,
    },
    {
      q: "Which prop uniquely identifies list items?",
      options: ["id", "name", "key", "index"],
      answer: 2,
    },
    {
      q: "Which hook memoizes a computed value?",
      options: ["useEffect", "useMemo", "useRef", "useState"],
      answer: 1,
    },
    {
      q: "What is the virtual DOM?",
      options: [
        "A copy of the real DOM",
        "A browser API",
        "A CSS framework",
        "A database",
      ],
      answer: 0,
    },
    {
      q: "Which hook is used for complex state logic?",
      options: ["useReducer", "useMemo", "useRef", "useLayoutEffect"],
      answer: 0,
    },
  ],

  "Node.js": [
    {
      q: "Node.js is built on which JavaScript engine?",
      options: ["SpiderMonkey", "V8", "Chakra", "JavaScriptCore"],
      answer: 1,
    },
    {
      q: "Which module is used to create a server in Node.js?",
      options: ["fs", "path", "http", "url"],
      answer: 2,
    },
    {
      q: "Which module is used to work with file systems?",
      options: ["http", "fs", "os", "url"],
      answer: 1,
    },
    {
      q: "What command initializes a Node project?",
      options: ["npm start", "npm init", "node init", "npm create"],
      answer: 1,
    },
    {
      q: "Which object represents the current module?",
      options: ["global", "module", "window", "exports"],
      answer: 1,
    },
    {
      q: "Which function imports another module?",
      options: ["import()", "load()", "require()", "include()"],
      answer: 2,
    },
    {
      q: "Which package manager comes with Node.js?",
      options: ["Yarn", "npm", "pnpm", "Bower"],
      answer: 1,
    },
    {
      q: "Node.js is primarily used for?",
      options: [
        "Machine Learning",
        "Server-side JavaScript",
        "Game Development",
        "Photo Editing",
      ],
      answer: 1,
    },
    {
      q: "Which object contains command-line arguments?",
      options: ["process.argv", "process.args", "node.argv", "args"],
      answer: 0,
    },
    {
      q: "Which module provides operating system information?",
      options: ["sys", "os", "system", "info"],
      answer: 1,
    },
  ],

  "MongoDB": [
    {
      q: "MongoDB stores data in which format?",
      options: ["XML", "BSON", "CSV", "YAML"],
      answer: 1,
    },
    {
      q: "What is a MongoDB database made up of?",
      options: ["Tables", "Collections", "Sheets", "Files"],
      answer: 1,
    },
    {
      q: "A MongoDB collection contains?",
      options: ["Rows", "Documents", "Classes", "Indexes"],
      answer: 1,
    },
    {
      q: "Which command inserts one document?",
      options: ["insert()", "insertOne()", "add()", "push()"],
      answer: 1,
    },
    {
      q: "Which command retrieves documents?",
      options: ["search()", "get()", "find()", "fetch()"],
      answer: 2,
    },
    {
      q: "Which method updates a single document?",
      options: ["updateOne()", "modify()", "replace()", "changeOne()"],
      answer: 0,
    },
    {
      q: "Which method deletes one document?",
      options: ["deleteOne()", "remove()", "drop()", "erase()"],
      answer: 0,
    },
    {
      q: "What is the default port of MongoDB?",
      options: ["3306", "5432", "27017", "8080"],
      answer: 2,
    },
    {
      q: "Which field is automatically created?",
      options: ["id", "_id", "uuid", "key"],
      answer: 1,
    },
    {
      q: "MongoDB is a?",
      options: [
        "Relational Database",
        "NoSQL Database",
        "Graph Database",
        "Spreadsheet",
      ],
      answer: 1,
    },
  ],

  "Express.js": [
    {
      q: "Which method registers a GET route in Express?",
      options: ["app.get()", "app.fetch()", "app.read()", "app.route()"],
      answer: 0,
    },
    {
      q: "Which object represents the request?",
      options: ["req", "requester", "res", "app"],
      answer: 0,
    },
    {
      q: "Which object sends the response?",
      options: ["req", "app", "res", "router"],
      answer: 2,
    },
    {
      q: "Which middleware parses JSON requests?",
      options: [
        "express.json()",
        "express.body()",
        "body.parse()",
        "json.parse()",
      ],
      answer: 0,
    },
    {
      q: "Which method creates an Express application?",
      options: ["express()", "app()", "createApp()", "new Express()"],
      answer: 0,
    },
    {
      q: "Which method starts the server?",
      options: ["app.run()", "app.start()", "app.listen()", "server.run()"],
      answer: 2,
    },
    {
      q: "Express.js is built on top of?",
      options: ["React", "Node.js", "MongoDB", "Angular"],
      answer: 1,
    },
    {
      q: "Which method handles POST requests?",
      options: ["app.send()", "app.post()", "app.write()", "app.push()"],
      answer: 1,
    },
    {
      q: "Middleware functions have how many parameters?",
      options: ["2", "3", "4", "5"],
      answer: 2,
    },
    {
      q: "Which method serves static files?",
      options: [
        "express.static()",
        "app.static()",
        "serve.files()",
        "staticFiles()",
      ],
      answer: 0,
    },
  ],

  "JavaScript": [
    {
      q: "Which keyword declares a block-scoped variable?",
      options: ["var", "let", "global", "static"],
      answer: 1,
    },
    {
      q: "Which keyword declares a constant?",
      options: ["const", "static", "let", "var"],
      answer: 0,
    },
    {
      q: "Which operator checks both value and type?",
      options: ["==", "===", "=", "!="],
      answer: 1,
    },
    {
      q: "What is the result of typeof null?",
      options: ["null", "object", "undefined", "boolean"],
      answer: 1,
    },
    {
      q: "Which array method adds an element to the end?",
      options: ["push()", "pop()", "shift()", "unshift()"],
      answer: 0,
    },
    {
      q: "Which array method removes the last element?",
      options: ["shift()", "pop()", "splice()", "slice()"],
      answer: 1,
    },
    {
      q: "Which function converts JSON to an object?",
      options: [
        "JSON.parse()",
        "JSON.stringify()",
        "JSON.object()",
        "parseJSON()",
      ],
      answer: 0,
    },
    {
      q: "Which function converts an object to JSON?",
      options: [
        "JSON.stringify()",
        "JSON.parse()",
        "toJSON()",
        "stringifyObject()",
      ],
      answer: 0,
    },
    {
      q: "Which loop executes at least once?",
      options: ["for", "while", "do...while", "forEach"],
      answer: 2,
    },
    {
      q: "Which method creates a new array by transforming each element?",
      options: ["filter()", "reduce()", "map()", "find()"],
      answer: 2,
    },
  ],
};

function PracticePanel({ course, onClose }) {
  const questions = PRACTICE_BANK[course.name] || [];
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (questions.length === 0) {
    return (
      <div className="modal modal-open">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{course.name} - Practice</h3>
          <p className="py-4">
            Practice questions for this course are coming soon. Check back
            later!
          </p>
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }

  const handleAnswer = (idx) => {
    setSelected(idx);
  };

  const handleNext = () => {
    if (selected === questions[current].answer) {
      setScore((s) => s + 1);
    }
    setSelected(null);
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{course.name} - Practice</h3>

        {finished ? (
          <>
            <p className="py-4">
              You scored {score} / {questions.length} 🎉
            </p>
            <button className="btn btn-primary" onClick={onClose}>
              Close
            </button>
          </>
        ) : (
          <>
            <p className="py-4">
              Q{current + 1}. {questions[current].q}
            </p>
            <div className="flex flex-col gap-2">
              {questions[current].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className={`px-3 py-2 rounded-md border text-left duration-200 ${
                    selected === idx
                      ? "bg-pink-500 text-white"
                      : "hover:bg-pink-100 dark:hover:bg-slate-700"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <div className="modal-action">
              <button className="btn" onClick={onClose}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                disabled={selected === null}
                onClick={handleNext}
              >
                {current + 1 === questions.length ? "Finish" : "Next"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Training() {
  const { enrolledCourses } = useEnroll();
  const [activeCourse, setActiveCourse] = useState(null);

  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 mt-28 min-h-screen">
        <h1 className="text-2xl md:text-4xl text-center">
          Training & <span className="text-pink-500">Practice</span>
        </h1>
        <p className="text-center mt-4 opacity-80">
          Practice exercises for the courses you're enrolled in.
        </p>

        {enrolledCourses.length === 0 ? (
          <div className="text-center mt-12">
            <p>You haven't enrolled in any course yet.</p>
            <Link to="/course">
              <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
                Browse Courses
              </button>
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 pb-16">
            {enrolledCourses.map((course) => (
              <div
                key={course._id}
                className="card bg-base-100 shadow-xl dark:bg-slate-900 dark:text-white dark:border"
              >
                <figure>
                  <img src={course.image} alt={course.name} className="h-40 w-full object-cover" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{course.name}</h2>
                  <p>{course.title}</p>
                  <div className="card-actions justify-end">
                    <button
                      onClick={() => setActiveCourse(course)}
                      className="bg-pink-500 text-white px-3 py-1 rounded-full hover:bg-pink-700 duration-200"
                    >
                      Start Practice
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {activeCourse && (
        <PracticePanel
          course={activeCourse}
          onClose={() => setActiveCourse(null)}
        />
      )}

      <Footer />
    </>
  );
}

export default Training;
