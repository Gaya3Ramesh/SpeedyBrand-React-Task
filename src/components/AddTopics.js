import React, { useState } from "react";

const AddTopics = ({ addTopic, goBack }) => {
  const [topicName, setTopicName] = useState("");
  const [keywords, setKeywords] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const topic = {
      topic: topicName,
      keywords: keywords.split(",").map((keyword) => keyword.trim()),
    };
    addTopic(topic);  
    setTopicName("");
    setKeywords("");
  };

  return (
    <div className="add-topics">
      <form onSubmit={handleSubmit}>
        <div className="formAddTopics">
          <button className="btn-cross" onClick={goBack}>X</button>
          <h2>Add Topic</h2>
          <div className="labelInput">
            <div className="inputfied">
              <label htmlFor="topicName">Topic Name:</label>
              <input
                type="text"
                id="topicName"
                className="input-text"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
              />
            </div>
            <div className="inputfied">
              <label htmlFor="keywords">Keywords:</label>
              <input
                type="text"
                id="keywords"
                className="input-text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>
          </div>
          <div className="saveButton">
            <button type="submit">Add Topics</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTopics;
