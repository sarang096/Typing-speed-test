import React, { useState, useEffect } from 'react';
import './history.css';

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [editDateId, setEditDateId] = useState(null);
  const [newDate, setNewDate] = useState('');

  useEffect(() => {
    fetchHistoryData();
  }, []);

  const fetchHistoryData = async () => {
    try {
      const response = await fetch('http://localhost:3001/typingTests');
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        setHistoryData(data);
        setErrorMessage('');
      } else {
        setErrorMessage('No typing test history found.');
      }
    } catch (error) {
      console.error('Error fetching typing test history:', error);
      setErrorMessage('Failed to fetch typing test history.');
    }
  };

  const deleteHistory = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/deleteHistory/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedHistoryData = historyData.filter(entry => entry._id !== id);
        setHistoryData(updatedHistoryData);
        setErrorMessage('');
        console.log('History entry deleted successfully.');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to delete history entry.');
      }
    } catch (error) {
      console.error('Error deleting history entry:', error);
      setErrorMessage('An error occurred while trying to delete the history entry.');
    }
  };

  const updateDate = async (id, newDate) => {
    try {
      const response = await fetch('http://localhost:3001/updateHistoryDate', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, newDate }),
      });

      if (response.ok) {
        const data = await response.json();
        setHistoryData(historyData.map(entry => 
          entry._id === id ? { ...entry, date: new Date(newDate).toISOString() } : entry
        ));
        setEditDateId(null);
        console.log(data.message);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      console.error('Error updating date:', error);
      setErrorMessage('Failed to update date.');
    }
  };

  return (
    <div id="profile-container">
      <h2>Typing Test History</h2>

      {errorMessage && <p id="message">{errorMessage}</p>}

      {historyData.length > 0 ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Words Per Minute</th>
                <th>Accuracy</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.userName}</td>
                  <td>{entry.wordsPerMinute.toFixed(2)}</td>
                  <td>{entry.accuracy}%</td>
                  <td>
                    {editDateId === entry._id ? (
                      <input
                        type="datetime-local"
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                      />
                    ) : (
                      new Date(entry.date).toLocaleString()
                    )}
                  </td>
                  <td>
                    {editDateId === entry._id ? (
                      <button onClick={() => updateDate(entry._id, newDate)} className="update-button">
                        Save
                      </button>
                    ) : (
                      <button onClick={() => {
                        setEditDateId(entry._id);
                        setNewDate(new Date(entry.date).toISOString().slice(0, 16));
                      }} className="edit-button">
                        Edit Date
                      </button>
                    )}
                    <button onClick={() => deleteHistory(entry._id)} className="delete-button">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No history available.</p>
      )}
    </div>
  );
};

export default History;
