import React, { useState } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IFormInput {
  image: FileList;
}

const ImgBBUpload: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (!data.image || data.image.length === 0) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('image', data.image[0]);

    try {
      const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
        params: {
          key: process.env.REACT_APP_IMGBB_API_KEY, // Replace with your ImgBB API key
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="file"
          {...register('image', { required: true })}
        />
        {errors.image && <span>This field is required</span>}
        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
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
