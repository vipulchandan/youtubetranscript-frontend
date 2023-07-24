import React, { useState } from 'react';
import axios from 'axios';

const VideoForm = ({ setVideoData }) => {
  const [inputUrl, setInputUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    if (!inputUrl.trim()) {
      setError('Please enter a YouTube video URL.');
      return;
    }

    const urlRegex = /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([^&]+).*/;
    if (!urlRegex.test(inputUrl)) {
      setError('Please enter a valid YouTube video URL.');
      return;
    }

    try {
      const response = await axios.post('https://creative-pebble-wilderness.glitch.me/api/transcript', { videoUrl: inputUrl });
    //   const response = await axios.post('http://localhost:5000/api/transcript', { videoUrl: inputUrl });
      setVideoData(response.data);
      if (!response.data.transcript) {
        setError('Transcript not available for the entered YouTube URL.');
      }
    } catch (error) {
      console.log(error);
      setError('An error occurred while fetching the transcript.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
        placeholder="Enter YouTube Video URL"
      />
      <button type="submit">Submit</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default VideoForm;



