import React, { useState } from "react";
import { Button } from "@mui/material";
import Cropper from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ImageEditor = ({ image, onClose, onUpdate }) => {
  const [crop, setCrop] = useState({ aspect: 1 });
  const [croppedImage, setCroppedImage] = useState(null);

  const handleCropComplete = () => {
    onUpdate({ ...image, cropped: croppedImage });
  };

  const rotateImage = () => {};

  const flipImage = (axis) => {};

  return (
    <div style={{ padding: "20px" }}>
      <h3>Edit Image</h3>
      <Cropper
        src={image.id}
        crop={crop}
        onChange={(newCrop) => setCrop(newCrop)}
        onComplete={handleCropComplete}
      />

      <div style={{ marginTop: "20px" }}>
        <Button variant="contained" onClick={rotateImage}>
          Rotate Clockwise
        </Button>
        <Button variant="contained" onClick={() => flipImage("horizontal")}>
          Flip Horizontally
        </Button>
        <Button variant="contained" onClick={() => flipImage("vertical")}>
          Flip Vertically
        </Button>
        <Button variant="contained" color="error" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default ImageEditor;
