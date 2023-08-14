import React, { useState } from "react";

const EditPicture = ({
  images,
  setImages,
  imagesToDelete,
  setImagesToDelete,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleImageDelete = (index, id) => {    
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    setImagesToDelete([...imagesToDelete, id]);
  };

  return (
    <div className="border p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold mb-2">Product Images</h2>
      </div>
      {!isCollapsed && images.length > 0 && (
        <div className="grid grid-cols-5 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                className="min-h-min mt-4 object-contain transition-opacity hover:opacity-80"
                src={image.url}
                width={100}
                height={100}
                alt={`Product Image ${index + 1}`}
              />
              <button
                className="absolute top-0 right-0 w-6 h-6 text-red-500 bg-white rounded-full flex items-center justify-center border border-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleImageDelete(index, image.id)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditPicture;
