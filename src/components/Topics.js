import React, { useState } from "react";
import Editor from "./Editor";
import AddTopics from "./AddTopics";

const Topics = () => {
  const [topics, setTopics] = useState([
    {
      id: 1,
      topic:
        "The importance of establishing a Strong Online presence for small business",
      keywords: [
        "Online presence",
        "Small business",
        "Digital marketing",
        "Branding",
      ],
    },
    {
      id: 2,
      topic:
        "how fast turnaround times in logo and website design benefit your business",
      keywords: [
        "Fast turnaround",
        "Logo design",
        "Website design",
        "Branding",
      ],
    },
    {
      id: 3,
      topic: "affordable branding solutions for startups and entrepreneurs",
      keywords: [
        "Affordable branding",
        "Startups",
        "Entrepreneurs",
        "Logo design",
        "Website design",
      ],
    },
    {
      id: 4,
      topic:
        "the benefits of comprehensive branding services for small to medium-sized businesses",
      keywords: [
        "Comprehensive branding",
        "Small business",
        "Logo design",
        "Website design",
        "Social media management",
      ],
    },
    {
      id: 5,
      topic:
        "expert tips for choosing the right digital marketing agency for your business",
      keywords: [
        "Digital marketing agency",
        "Tips",
        "Branding",
        "Website design",
        "Social media management",
      ],
    },
  ]);

  const [showEditor, setShowEditor] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleDeleteTopic = (topicId) => {
    setTopics((prevTopics) =>
      prevTopics.filter((topic) => topic.id !== topicId)
    );
  };

  const handleWrite = () => {
    setShowEditor(true);
  };

  const addTopic = (topic) => {
    setTopics((prevTopics) => [...prevTopics, topic]);
    setShowAddForm(false);
  };

  const renderTopics = () => {
    return (
      <div className="topic">
        <table>
          <thead>
            <tr>
              <th colSpan="2">Recommended Topics</th>
            </tr>
          </thead>
          {topics.map((topic) => (
            <React.Fragment key={topic.id}>
              <tbody>
                <tr>
                  <td>
                    <strong>{topic.topic}</strong>
                    <br />
                    {topic.keywords.map((keyword, index) => (
                      <React.Fragment key={index}>
                        <button className={`btn ${getKeywordColor(index)}`}>
                          {keyword}
                        </button>
                      </React.Fragment>
                    ))}
                  </td>
                  <td>
                    <button className="btn btn-write" onClick={handleWrite}>
                      Write {">"}
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteTopic(topic.id)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              </tbody>
            </React.Fragment>
          ))}
        </table>
      </div>
    );
  };

  const getKeywordColor = (index) => {
    if (index === 0 || index === 3) {
      return "btn-yellow";
    } else if (index === 1 || index === 4) {
      return "btn-green";
    } else if (index === 2) {
      return "btn-red";
    } else {
      return "btn-default";
    }
  };

  return (
    <div className="topics-container">
      {!showEditor && !showAddForm && (
        <>
          <h1>Categories</h1>
          <nav className="header-nav">
            <ul>
              <li>All</li>
              <li>Custom</li>
              <li>ICP</li>
              <li className="active">Mission</li>
              <li>Product</li>
            </ul>
            <button
              className="btn btn-addTopics"
              onClick={() => setShowAddForm(true)}
            >
              Add Topics {">"}
            </button>
          </nav>
          {renderTopics()}
        </>
      )}
      {showAddForm && <AddTopics addTopic={addTopic} />}
      {showEditor && <Editor />}
    </div>
  );
};

export default Topics;
