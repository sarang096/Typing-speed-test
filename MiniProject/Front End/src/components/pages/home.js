import React, { useState, useEffect, useRef, useMemo } from "react";
import "./home.css";
import { useTheme } from "./ThemeContext";
import { useFontSize } from "./FontSizeContext";
import Settings from "./SettingsNavbar.js";

const Home = () => {
  const { isDarkTheme, setIsDarkTheme } = useTheme();
  const { fontSize, setFontSize } = useFontSize();

  const [textToType, setTextToType] = useState("");
  const [typedText, setTypedText] = useState("");
  const [errors, setErrors] = useState(0);
  const [rawSpeed, setRawSpeed] = useState(0);
  const [actualSpeed, setActualSpeed] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [startTime, setStartTime] = useState(null);
  const [correctWords, setCorrectWords] = useState(0);
  const [usePunctuation, setUsePunctuation] = useState(false);
  const [useNumbers, setUseNumbers] = useState(false);
  const [wordCount, setWordCount] = useState(10);
  const [speedUnit, setSpeedUnit] = useState("WPM");
  const [message, setMessage] = useState("");

  const gameContainerRef = useRef(null);

  useEffect(() => {
    initializeGame();
    gameContainerRef.current.focus(); 
  }, [usePunctuation, useNumbers, wordCount]);

  const generateRandomSentence = useMemo(() => {
    return (wordCount, usePunctuation, useNumbers) => {
      const words = [
        "a",
        "about",
        "all",
        "also",
        "and",
        "as",
        "at",
        "be",
        "because",
        "but",
        "by",
        "can",
        "come",
        "could",
        "day",
        "do",
        "even",
        "find",
        "first",
        "for",
        "from",
        "get",
        "give",
        "go",
        "have",
        "he",
        "her",
        "here",
        "him",
        "his",
        "how",
        "if",
        "in",
        "into",
        "it",
        "its",
        "just",
        "know",
        "like",
        "look",
        "make",
        "man",
        "many",
        "me",
        "more",
        "my",
        "new",
        "no",
        "not",
        "now",
        "of",
        "on",
        "one",
        "only",
        "or",
        "other",
        "our",
        "out",
        "people",
        "say",
        "see",
        "she",
        "so",
        "some",
        "take",
        "tell",
        "than",
        "that",
        "the",
        "their",
        "them",
        "then",
        "there",
        "these",
        "they",
        "thing",
        "think",
        "this",
        "those",
        "time",
        "to",
        "two",
        "up",
        "use",
        "very",
        "want",
        "way",
        "we",
        "well",
        "what",
        "when",
        "which",
        "who",
        "will",
        "with",
        "would",
        "year",
        "you",
        "your",
      ];
      const punctuations = [",", ".", "!", "?"];
      const numbers = ["123", "456", "789", "012", "345"];

      let sentence = [];
      for (let i = 0; i < wordCount; i++) {
        let word = words[Math.floor(Math.random() * words.length)];
        if (usePunctuation && Math.random() > 0.8) {
          word += punctuations[Math.floor(Math.random() * punctuations.length)];
        }
        if (useNumbers && Math.random() > 0.7) {
          word = numbers[Math.floor(Math.random() * numbers.length)];
        }
        sentence.push(word);
      }
      return sentence.join(" ");
    };
  }, [usePunctuation, useNumbers, wordCount]);

  const initializeGame = () => {
    const text = generateRandomSentence(wordCount, usePunctuation, useNumbers);
    setTextToType(text);
    resetTest();
  };

  const resetTest = () => {
    setTypedText("");
    setErrors(0);
    setRawSpeed(0);
    setActualSpeed(0);
    setAccuracy(100);
    setCorrectWords(0);
    setStartTime(new Date());
  };

  const handleTyping = (e) => {
    if (!startTime) {
      setStartTime(new Date());
    }

    const typedValue = e.key;
    const targetText = textToType;

    if (typedValue === "Backspace") {
      setTypedText((prev) => prev.slice(0, -1));
    } else if (/[a-zA-Z0-9\s.,!?]/.test(typedValue)) {
      setTypedText((prev) => prev + typedValue);
    }

    // Calculate errors and accuracy
    const newTypedText = typedText + typedValue;
    let errorCount = 0;
    let correctCount = 0;
    let correctWordCount = 0;

    const targetWords = targetText.split(" ");
    const typedWords = newTypedText.trim().split(" ");
    targetWords.forEach((word, index) => {
      if (typedWords[index] === word) {
        correctWordCount++;
      }
    });

    newTypedText.split("").forEach((char, index) => {
      if (char !== targetText[index]) {
        errorCount++;
      } else {
        correctCount++;
      }
    });

    setErrors(errorCount);
    updateFeedback(correctCount, newTypedText.length, typedWords.length);
    setCorrectWords(correctWordCount);

    if (newTypedText.length === targetText.length) {
      displayMessage("Text completed, starting a new one.");
      saveTestResult(); // Save the result when the text is completed
      setTimeout(initializeGame, 3000);
    }
  };

  const updateFeedback = (correctCount, typedLength, wordCount) => {
    const currentTime = new Date();
    const elapsedTime = (currentTime - startTime) / 1000 / 60;

    const rawWPM = typedLength / 5 / elapsedTime;
    const netWPM = correctCount / 5 / elapsedTime;
    const newAccuracy =
      typedLength > 0 ? Math.round((correctCount / typedLength) * 100) : 100;

    setRawSpeed(isNaN(rawWPM) ? 0 : rawWPM.toFixed(2));
    setActualSpeed(isNaN(netWPM) || netWPM < 0 ? 0 : netWPM.toFixed(2));
    setAccuracy(newAccuracy);
    setCorrectWords(correctCount);
  };

  const displayMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const restartTest = () => {
    resetTest();
  };

  const newTest = () => {
    initializeGame();
  };

  const saveTestResult = async () => {
    const userId = localStorage.getItem("userId"); // Retrieve the user ID from local storage
    const userName = localStorage.getItem("userName"); // Retrieve the user name from local storage

    const response = await fetch("http://localhost:3001/saveTest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        userName: userName, // Include userName
        text: textToType,
        wordsPerMinute: actualSpeed,
        accuracy: accuracy,
        date: new Date(),
      }),
    });

    if (response.ok) {
      displayMessage("Test result saved successfully!");
    } else {
      displayMessage("Failed to save test result.");
    }
  };

  return (
    <div
      ref={gameContainerRef}
      id="game-container"
      className={isDarkTheme ? "dark-theme" : "light-theme"}
      onKeyDown={handleTyping}
      tabIndex={0}
    >
      <Settings
        wordCount={wordCount}
        setWordCount={setWordCount}
        usePunctuation={usePunctuation}
        setUsePunctuation={setUsePunctuation}
        useNumbers={useNumbers}
        setUseNumbers={setUseNumbers}
      />
      <div className="box">
        <h1>Typing Speed Test</h1>
        <p id="text-to-type">
          {Array.from(textToType).map((char, index) => {
            const isTyped = index < typedText.length;
            const isCorrect = typedText[index] === char;
            const charClass = isTyped
              ? isCorrect
                ? "correct"
                : "incorrect"
              : "neutral";
            const cursorClass = index === typedText.length ? "cursor" : "";

            return (
              <span key={index} className={`${charClass} ${cursorClass}`}>
                {char}
              </span>
            );
          })}
        </p>
        <div id="feedback">
          <p>
            Speed: {actualSpeed} {speedUnit}
          </p>
          <p>Accuracy: {accuracy}%</p>
          <p>Correct Words: {correctWords}</p>
        </div>
        <p id="message-area">{message}</p>
        <div id="controls">
          <button onClick={restartTest} className="button-style">
            Restart Test
          </button>
          <button onClick={newTest} className="button-style">
            New Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

