import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import NextImage from "next/image";

function Img({ url, width, height }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="block w-full max-h-[600px] my-2 relative"
    >
      {/* 
        sizes : to scale down image on viewport level, 
        especially for image that's not supposed to fill full viewport (ex : thumbnail)
        layout responsive : to scale image based on device screen size
      */}
      <NextImage
        src={url}
        width={width}
        height={height}
        sizes="50vw"
        layout="responsive"
        objectFit="cover"
        placeholder="blur"
        blurDataURL={`https://via.placeholder.com/${width}x${height}.jpg?text=+`}
        className="cursor-pointer sm:rounded"
      />
    </motion.div>
  );
}

export default Img;
