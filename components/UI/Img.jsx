import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import NextImage from "next/image";

function Img({ url, width, height, tags, isAnonymous }) {
  return (
    <div>
      <div className="block w-full max-h-[600px] my-2 relative group">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ filter: "brightness(85%)" }}
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
        <div className="absolute hidden duration-150 opacity-0 bottom-3 left-2 group-hover:opacity-100 sm:inline">
          <span className="inline-block mb-2 font-sans text-white">
            By : {isAnonymous && "Anonymous"}{" "}
          </span>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div className="font-sans capitalize rounded-sm badge badge-ghost">
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="inline px-3 sm:hidden">
        <span className="inline-block mb-2 font-sans font-semibold text-gray-600">
          By : {isAnonymous && "Anonymous"}{" "}
        </span>
        <div className="flex flex-wrap gap-2 px-3">
          {tags.map((tag) => (
            <div className="font-sans capitalize rounded-sm badge">{tag}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Img;
