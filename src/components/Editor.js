import React, { useState, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Modal from "react-modal";
import AvatarEditor from "react-avatar-editor";
import cameraImage from "./cameraImg.png";

const Editor = () => {
  const [tone, setTone] = useState("neutral");
  const [blogContent, setBlogContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [crop, setCrop] = useState({
    unit: "%",
    width: 100,
    aspect: 16 / 9,
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editedImage, setEditedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const editorRef = useRef(null);
  const imageRef = useRef(null);
  const avatarEditorRef = useRef(null);

  const handleToneChange = (event) => {
    setTone(event.target.value);
  };

  const handleGenerateBlog = () => {
    setIsOpen(false);
  };

  const handleContentChange = (event) => {
    setBlogContent(event.target.value);
  };

  const handleUndo = (event) => {
    if (event.ctrlKey && event.key === "z") {
      event.preventDefault();
      const textarea = editorRef.current;
      textarea.value = blogContent;
      setBlogContent(textarea.value);
    }
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
        openModal();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageCropComplete = (crop) => {
    console.log(crop);
  };

  const handleEditImage = () => {
    const canvas = avatarEditorRef.current.getImageScaledToCanvas().toDataURL();
    setEditedImage(canvas);
    closeModal();
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    const editorElement = editorRef.current;

    editorElement.addEventListener("keydown", handleUndo);

    return () => {
      editorElement.removeEventListener("keydown", handleUndo);
    };
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="blog-editor">
      <div className="editor-nav">
        <h3 className="editor-title">Blog Editor</h3>
        <div className="editor-tone">
          <label>Tone:</label>
          <select value={tone} onChange={handleToneChange}>
            <option value="neutral">Neutral</option>
            <option value="formal">Formal</option>
            <option value="casual">Casual</option>
          </select>
          <button
            className="editor-generate-button"
            onClick={handleGenerateBlog}
          >
            Generate
          </button>
        </div>
      </div>
      <div>
        <textarea
          className="editor-textarea"
          value={blogContent}
          onChange={handleContentChange}
          rows={10}
          cols={50}
          ref={editorRef}
        />
      </div>
      <div className="image-container">
        {selectedImage ? (
          <img className="selected-image" src={selectedImage} alt="Selected" />
        ) : (
          <div className="camera-image">
            <img src={cameraImage} alt="Camera" />
            <div className="upload-options">
              <label htmlFor="file-upload" className="upload-label">
                Drag or choose a file
              </label>
              <input
                id="file-upload"
                className="file-input"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </div>
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Image Modal"
        ariaHideApp={false}
      >
        <h2>Edit Image</h2>
        <AvatarEditor
          ref={avatarEditorRef}
          image={selectedImage}
          width={250}
          height={250}
          border={50}
          color={[255, 255, 255, 0.6]}
          scale={1}
          rotate={0}
        />
        <ReactCrop
          src={selectedImage}
          crop={crop}
          onChange={(newCrop) => setCrop(newCrop)}
          onComplete={handleImageCropComplete}
          onImageLoaded={(image) => {
            imageRef.current = image;
          }}
        />
        <button onClick={handleEditImage}>Save</button>
      </Modal>
    </div>
  );
};

export default Editor;
