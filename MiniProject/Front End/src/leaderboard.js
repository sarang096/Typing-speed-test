import React, { useState, useEffect } from 'react';
import './leaderboard.css';

const Leaderboard = () => {
  const [topResults, setTopResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch top results when the component mounts
    fetchTopResults();
  }, []);

  // Fetch top results from the server
  const fetchTopResults = async () => {
    try {
      const response = await fetch('http://localhost:3001/profile');
      const data = await response.json();

      // Check if the response contains results
      if (data && data.topResults) {
        setTopResults(data.topResults);
      } else {
        setErrorMessage('No typing test results found.');
      }
    } catch (error) {
      console.error('Error fetching top results:', error);
      setErrorMessage('Failed to fetch top results.');
    }
  };

  return (
    <div id="profile-container">
      <h2>Top 10 Typing Test Results</h2>
      
      {/* Display error message if fetching fails */}
      {errorMessage && <p id="message">{errorMessage}</p>}

      {/* Display table of top results */}
      {topResults.length > 0 ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Words Per Minute</th>
                <th>Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {topResults.map((result, index) => (
                <tr key={index}>
                  <td>{result.userName}</td>
                  <td>{result.wordsPerMinute.toFixed(2)}</td>
                  <td>{result.accuracy}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No results available.</p>
      )}
    </div>
  );
};

export default Leaderboard;
