// App.js
import React, { useState } from "react";
import { Button, Drawer, Grid } from "@mui/material";
import { useDropzone } from "react-dropzone";
import ImageEditor from "./ImageEditor";
import Masonry from "react-masonry-css";
import "./styles.css";

const App = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map((file) => ({
      id: URL.createObjectURL(file),
      file,
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const openEditor = (image) => {
    setSelectedImage(image);
    setDrawerOpen(true);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div style={{ padding: "20px" }}>
      <div {...getRootProps()} className="upload-area">
        <input {...getInputProps()} />
        <p>Drag & drop images here, or click to upload</p>
      </div>

      <Masonry
        breakpointCols={3}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {images.map((image) => (
          <img
            key={image.id}
            src={image.id}
            alt="uploaded"
            onClick={() => openEditor(image)}
            className="uploaded-image"
          />
        ))}
      </Masonry>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {selectedImage && (
          <ImageEditor
            image={selectedImage}
            onClose={() => setDrawerOpen(false)}
            onUpdate={(updatedImage) => {
              setImages((prev) =>
                prev.map((img) =>
                  img.id === updatedImage.id ? updatedImage : img
                )
              );
              setDrawerOpen(false);
            }}
          />
        )}
      </Drawer>
    </div>
  );
};

export default App;
