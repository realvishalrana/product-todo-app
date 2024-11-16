import { getErrors } from "@/utils/helper";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ImageUploader = ({
  id,
  label,
  formik,
  inputName,
  labelClass = "",
  isRequired = false,
  onChange = () => {},
  fixedHeight = 150,
  fixedWidth = 150,
}) => {
  const [selectedImage, setSelectedImage] = useState(
    formik?.values[inputName] || ""
  );
  const router = useRouter();
  const { id:queryId } = router.query;

  useEffect(() => {
    if (queryId && queryId !== "new") {
      // First check if formik has a value for inputName
      if (
        formik?.values[inputName] &&
        formik?.values[inputName] !== selectedImage
      ) {
        setSelectedImage(formik?.values[inputName]);
        formik.setFieldValue(inputName, formik?.values[inputName]); // Ensure formik's value is correctly set
      }

      // Check if window is available and formik value is empty
      if (typeof window !== "undefined" && !formik?.values[inputName]) {
        const storedImage = localStorage.getItem(inputName); // Get image from localStorage
        if (storedImage) {
          setSelectedImage(storedImage); // Set image from localStorage to state
        }
      }
    }
  }, [id, formik?.values[inputName]]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;
        setSelectedImage(base64Image);

        // Update Formik's field value
        formik?.setFieldValue(inputName, base64Image);
        localStorage.setItem(inputName, base64Image); // Optionally store the image in localStorage
        onChange(base64Image); // Trigger the onChange handler if provided
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearStorage = () => {
    localStorage.removeItem(inputName);
    setSelectedImage(null);
    formik?.setFieldValue(inputName, null);
  };

  const errors = formik?.errors[inputName] && formik?.touched[inputName];

  return (
    <div className="w-full text-left">
      {/* Label */}
      <label htmlFor={id} className={`!block !mb-1 ${labelClass}`}>
        {label} {isRequired && "*"}
      </label>

      {/* Input Field */}
      <input
        id={id}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className={`w-full mb-2 ${errors ? "border-red-500" : ""}`}
      />

      {/* Error Message */}
      {errors ? (
        <p className="text-xs text-red mt-1">
          {getErrors({ formik, inputName })}
        </p>
      ) : null}

      {/* Display Uploaded Image */}
      {selectedImage && (
        <div className="mt-4">
          <h3 className="text-lg font-medium">Uploaded Image:</h3>
          <img
            src={selectedImage}
            alt="Uploaded Preview"
            style={{
              width: `${fixedWidth}px`,
              height: `${fixedHeight}px`,
              objectFit: "cover",
            }}
            className="border rounded-md mt-2"
          />
        </div>
      )}

      {/* Clear Storage Button */}
      {selectedImage && (
        <button
          onClick={handleClearStorage}
          className="mt-4 px-4 py-2 bg-red-500 text-red font-semibold rounded shadow-md transition-all duration-300 hover:bg-red-600 hover:shadow-lg active:scale-95"
        >
          Clear Image
        </button>
      )}
    </div>
  );
};

export default ImageUploader;
