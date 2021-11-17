import { motion } from "framer-motion";
import { useRef, useState } from "react";

function UploadFormPreview({
  previewFile,
  handleLoadPreview,
  handleUpload,
  fileName,
}) {
  const tagList = [
    "nature",
    "lake",
    "mountain",
    "ice",
    "landscape",
    "sky",
    "forest",
    "flower",
  ];

  const [tags, setTags] = useState([...tagList]);
  const [selectedTags, setSelectedTags] = useState([]);
  const inputSearchRef = useRef();
  const checkboxRef = useRef();

  const handleSelectedTag = (selected) => {
    const tempSelectedTag = [...selectedTags];
    const tempTags = [...tags];

    if (tempSelectedTag.includes(selected)) {
      tempSelectedTag = tempSelectedTag.filter((tag) => tag !== selected);
      tempTags.push(selected);
    } else {
      if (selectedTags.length >= 3) {
        alert("Sorry, only 3 tags per image!");
      } else {
        tempTags = tempTags.filter((tag) => tag !== selected);
        tempSelectedTag.push(selected);
      }
    }

    setTags(tempTags);
    setSelectedTags(tempSelectedTag);
  };

  const handleClick = () => {
    if (selectedTags.length > 0) {
      handleUpload(selectedTags, checkboxRef.current.checked);
    } else {
      alert("Sorry, you need to select at least one tag for your image");
    }
  };

  // const handleInputChange = (e) => {
  //   console.log(e.target.value);
  // };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col w-full px-5 py-10 bg-gray-100 rounded md:flex-row"
    >
      <div className="max-w-md px-5">
        <div className="flex justify-center">
          {/* needs to be rendered to dom before we can get the real size of this image */}
          <img
            src={previewFile}
            hidden
            onLoad={handleLoadPreview}
            alt="previewHIdden"
          />

          <img
            src={previewFile}
            className="max-h-[400px] w-full sm:max-h-[500px] object-cover rounded"
            alt="preview"
          />
        </div>
        <div className="flex gap-2 px-4 py-2 mt-5 text-blue-400 bg-blue-100 rounded">
          {fileName}
        </div>
      </div>

      <div className="flex flex-col flex-1">
        {/* tags search */}
        <div className="flex-1 ">
          <div className="mb-5 form-control">
            <label className="inline-block my-2 md:mt-0 label">
              <span className="label-text">
                Select your tags from selection below :
              </span>
            </label>
            {/* <input
              ref={inputSearchRef}
              onChange={handleInputChange}
              list="tags"
              type="text"
              placeholder="Search tags"
              className="input input-primary-custom"
            /> */}
            {/* tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {tags.map((tag) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0, duration: 0.5, ease: "easeInOut" }}
                  key={tag}
                  onClick={() => handleSelectedTag(tag)}
                  className="badge-primary-custom"
                >
                  {tag}
                </motion.div>
              ))}
            </div>
          </div>

          {/* selected tags */}
          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2 ">
              <span className="block w-full label-text">Selected : </span>
              {selectedTags.map((tag) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0, duration: 0.5, ease: "easeInOut" }}
                  key={tag}
                  onClick={() => handleSelectedTag(tag)}
                  className="border-none cursor-pointer badge bg-primary"
                >
                  {tag}
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="mt-5 form-control">
            <div className="label">
              <label htmlFor="anonymous" className="label-text">
                Submit image as Anonymous
              </label>
              <input
                id="anonymous"
                type="checkbox"
                checked
                disabled
                className="bg-white checkbox"
                ref={checkboxRef}
              />
            </div>
            <label className="ml-1 text-xs text-red-500 label-text">
              Auth feature is under development
            </label>
          </div>
          <button className="mt-5 uploadBtn btn-block" onClick={handleClick}>
            Upload
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default UploadFormPreview;
