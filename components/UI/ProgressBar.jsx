import { useEffect } from "react";
import useStorage from "../../hooks/useStorage";

function ProgressBar({ file, setFile, setIsUploading, width, height }) {
  const { progress, url } = useStorage(file, width, height);

  useEffect(() => {
    if (url) {
      setFile(null);
      setIsUploading(true);
    }
  }, [url]);

  return (
    <>
      <div className="flex items-center mt-2">
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
