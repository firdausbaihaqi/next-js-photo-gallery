import { useEffect, useRef, useState } from "react";
import ProgressBar from "./ProgressBar";

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

  return (
    <div className="grid place-items-center">
      <div>
        <form>
          <input hidden type="file" onChange={handleChange} ref={uploadBtn} />
        </form>
        <button className="uploadBtn" onClick={() => uploadBtn.current.click()}>
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
        {file && (
          <div className="w-full">
            <span className="flex gap-2 px-4 py-2 text-blue-400 bg-blue-100 rounded">
              {file.name}
            </span>
            <ProgressBar file={file} setFile={setFile} setStatus={setStatus} />
          </div>
        )}

        {/* status only appear when status state not null */}
        {status && (
          <span
            onClick={() => setStatus(null)}
            className={
              "cursor-pointer px-4 py-2 text-blue-400 duration-500 bg-blue-100 rounded transition-all ease-in-out " +
              (status === null ? "opacity-0" : "opacity-100")
            }
          >
            Upload Success &nbsp; ✖
          </span>
        )}
      </div>
    </div>
  );
}

export default UploadForm;
