import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProgressBar from "./ProgressBar";

//
//  dear myself in the future, you'll definitely forget how this component run
//  on input file -> if types match setPreviewFile & setTempFile
//
//

function UploadForm() {
  const [previewFile, setPreviewFile] = useState(null);
  const [fileDimension, setFileDimension] = useState([]);
  const [tempFile, setTempFile] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(null);

  const types = ["image/png", "image/jpeg"];
  const uploadBtn = useRef(null);

  const handleInputFile = (e) => {
    const selectedFile = e.target.files[0];

    // make a new image object to contain the preview and it's dimension
    // if user cancel the selection file then the next function will not run
    if (selectedFile) {
      const img = new Image();
      img.src = URL.createObjectURL(e.target.files[0]);

      if (selectedFile && types.includes(selectedFile.type)) {
        setPreviewFile(img.src);
        setTempFile(selectedFile);
        setError(null);
      } else {
        setPreviewFile(null);
        setError(
          "Please use png or jpg only to not make things complicated 😢"
        );
      }
    } else {
      // reset the previewFile if user cancel the selection file
      setPreviewFile(null);
    }
  };

  const handleLoadPreview = (e) => {
    setFileDimension([e.target.width, e.target.height]);
  };

  const handleUpload = () => {
    setFile(tempFile);
  };

  useEffect(() => {
    // cleanup when finished uploading
    if (isUploading !== null) {
      setPreviewFile(null);
      setFileDimension(null);
      setTempFile(null);
      setFile(null);
      uploadBtn.current.value = "";

      // show success alert for 5 second
      setTimeout(() => {
        setIsUploading(null);
      }, 5000);
    }
  }, [isUploading]);

  return (
    <div className="flex justify-center mt-5">
      <div className="grid place-items-center">
        {/* input */}
        <div>
          <form>
            <input
              hidden
              type="file"
              onChange={handleInputFile}
              ref={uploadBtn}
            />
          </form>
          <button
            className="inputBtn"
            onClick={() => uploadBtn.current.click()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
        </div>

        {/* output */}
        <div className="mt-5">
          {error && (
            <span className="px-4 py-2 text-red-400 bg-red-100 rounded">
              {" "}
              {error}{" "}
            </span>
          )}

          {/* preview image */}
          <AnimatePresence>
            {previewFile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full"
              >
                <div className="flex justify-center w-full ">
                  {/* needs to be rendered to dom before we can get the real size of this image */}
                  <img src={previewFile} hidden onLoad={handleLoadPreview} />

                  <img
                    src={previewFile}
                    className="max-h-[200px] max-w-[300px] sm:max-h-[300px] sm:max-w-[500px] object-cover rounded"
                  />
                </div>
                <button
                  className="mt-5 uploadBtn btn-block"
                  onClick={handleUpload}
                >
                  Upload
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* progress bar */}
          <AnimatePresence>
            {file && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full mt-5"
              >
                <span className="flex gap-2 px-4 py-2 text-blue-400 bg-blue-100 rounded">
                  Uploading {file.name}
                </span>
                <ProgressBar
                  file={file}
                  width={fileDimension[0]}
                  height={fileDimension[1]}
                  setFile={setFile}
                  setIsUploading={setIsUploading}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* status only appear when isUploading state not null */}
          <AnimatePresence>
            {isUploading && (
              <motion.span
                transition={{ ease: "easeInOut" }}
                initial={{ opacity: 0, y: "-100vh" }}
                animate={{ opacity: 1, y: "0vh" }}
                exit={{ opacity: 0, y: "-100vh" }}
                onClick={() => setIsUploading(null)}
                className="fixed px-5 py-3 text-blue-400 bg-blue-100 rounded cursor-pointer top-5 right-5"
              >
                Upload Success
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default UploadForm;
