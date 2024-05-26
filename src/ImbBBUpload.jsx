import React, { useState } from 'react';
import axios from 'axios';

const ImgBBUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
        params: {
          key: 'c7d1094759e265cd70a5f14871502f43', // Replace with your ImgBB API key
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setImageUrl(response.data.data.url);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {imageUrl && (
        <div>
          <p>Image uploaded successfully:</p>
          <img src={imageUrl} alt="Uploaded" />
        </div>
      )}
    </div>
  );
};

export default ImgBBUpload;
