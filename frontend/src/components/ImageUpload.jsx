import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { Button } from './ui/button';
import { Alert } from './ui/alert';

const AlertDescription = ({ children, className = '' }) => (
  <div className={`text-sm mt-1 ${className}`}>
    {children}
  </div>
);

const ImageUpload = ({ onImagesUploaded }) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadToImgBB = async (base64Image) => {
    const apiKey = "7fdc2bd905952051c04dd15a66326231";
    const formData = new FormData();
    formData.append("image", base64Image.split(',')[1]);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error('Failed to get image URL from response');
      }

      return data.data.url;
    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setIsUploading(true);
    setError(null);

    try {
      const uploadPromises = files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = async () => {
            try {
              const imageUrl = await uploadToImgBB(reader.result);
              resolve({ url: imageUrl, name: file.name });
            } catch (error) {
              reject(error);
            }
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setUploadedImages((prev) => [...prev, ...uploadedUrls]);
      onImagesUploaded(uploadedUrls.map(img => img.url));
    } catch (error) {
      setError('Failed to upload one or more images. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <Alert className="bg-red-50 border-red-200">
          <AlertDescription className="text-red-800">
            {error}
          </AlertDescription>
        </Alert>
      )}

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-300 transition-colors">
        <Camera className="mx-auto h-12 w-12 text-gray-400" />
        <div className="mt-4">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
            disabled={isUploading}
          />
          <Button 
            onClick={() => document.getElementById('image-upload').click()}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 rounded-lg"
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload Images'}
          </Button>
        </div>
      </div>

      {uploadedImages.length > 0 && (
        <div>
          <h3 className="font-medium text-gray-900 mb-4">Uploaded Images</h3>
          <div className="grid grid-cols-3 gap-4">
            {uploadedImages.map((image, index) => (
              <div key={index} className="group relative aspect-video bg-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                <img 
                  src={image.url} 
                  alt={image.name}
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <button
                    onClick={() => {
                      const newImages = uploadedImages.filter((_, i) => i !== index);
                      setUploadedImages(newImages);
                      onImagesUploaded(newImages.map(img => img.url));
                    }}
                    className="opacity-0 group-hover:opacity-100 bg-red-500 text-white px-3 py-1 rounded-full text-sm transition-all duration-300"
                  >
                    Remove
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/50 to-transparent">
                  <p className="text-white text-sm truncate">{image.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;