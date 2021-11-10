import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import NextImage from "next/image";

function Img({ url }) {
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);

  useEffect(() => {
    // make new image instance to get it's dimension
    const img = new Image();
    img.src = url;

    setImgWidth(img.width);
    setImgHeight(img.height);
  }, [url]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="block w-full max-h-[600px] my-2 rounded cursor-pointer relative"
    >
      <NextImage
        src={url}
        width={imgWidth}
        height={imgHeight}
        objectFit="cover"
      />
    </motion.div>
  );
}

export default Img;
