import { useEffect, useRef, useState } from "react";
import ProgressBar from "./ProgressBar";
import { motion, AnimatePresence } from "framer-motion";

function UploadForm() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);

  const types = ["image/png", "image/jpeg"];
  const uploadBtn = useRef(null);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && types.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError("");
    } else {
      setFile(null);
      setError(
        "Please use png or jpg image only to not make things complicated 😢"
      );
    }
  };

  useEffect(() => {
    if (status) {
      setTimeout(() => {
        setStatus(null);
      }, 5000);
    }
  }, [status]);

  return (
    <div className="flex justify-center mt-5">
      <div className="grid place-items-center">
        <div>
          <form>
            <input hidden type="file" onChange={handleChange} ref={uploadBtn} />
          </form>
          <button
            className="uploadBtn"
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
          <AnimatePresence>
            {file && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full"
              >
                <span className="flex gap-2 px-4 py-2 text-blue-400 bg-blue-100 rounded">
                  {file.name}
                </span>
                <ProgressBar
                  file={file}
                  setFile={setFile}
                  setStatus={setStatus}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* status only appear when status state not null */}
          <AnimatePresence>
            {status && (
              <motion.span
                transition={{ ease: "easeInOut" }}
                initial={{ opacity: 0, y: "-100vh" }}
                animate={{ opacity: 1, y: "0vh" }}
                exit={{ opacity: 0, y: "-100vh" }}
                onClick={() => setStatus(null)}
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
