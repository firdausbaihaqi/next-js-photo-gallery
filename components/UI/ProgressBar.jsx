import { useEffect } from "react";
import useStorage from "../../hooks/useStorage";
import { motion } from "framer-motion";

function ProgressBar({ file, setFile, setStatus }) {
  const { progress, url } = useStorage(file);

  useEffect(() => {
    if (url) {
      setFile(null);
      setStatus(true);
    }
  }, [url]);

  return (
    <>
      <div className="flex items-center mt-5">
        <div className="w-full bg-red-100 progress">
          <div
            className="duration-500 bg-red-400 progress"
            style={{ width: progress + "%" }}
          ></div>
        </div>
        <div className="ml-5"> {Math.round(progress)}% </div>
      </div>
    </>
  );
}

export default ProgressBar;
