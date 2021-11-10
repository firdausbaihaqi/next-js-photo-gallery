import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import NextImage from "next/image";

function Img({ url }) {
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);

  // make new image instance to get it's dimension
  const img = new Image();
  img.src = url;

  useEffect(() => {
    setImgWidth(img.width);
    setImgHeight(img.height);
    console.log(img.width, img.height);
    console.log(imgWidth, imgHeight);
  }, [img.width, img.height]); //img dimension always start at 0 because it's not fully loaded

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="block w-full max-h-[600px] my-2 relative"
    >
      <NextImage
        src={url}
        width={imgWidth}
        height={imgHeight}
        objectFit="cover"
        className="rounded cursor-pointer"
      />
    </motion.div>
  );
}

export default Img;
