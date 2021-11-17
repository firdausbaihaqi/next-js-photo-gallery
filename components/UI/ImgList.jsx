import useFirestore from "../../hooks/useFirestore";
import { motion } from "framer-motion";
import Img from "./Img";

function ImageList() {
  const { docs } = useFirestore("images");

  return (
    <div className="w-full gap-6 mt-10 col-count-1 md:col-count-2 lg:col-count-3 ">
      {docs &&
        docs.map((doc) => (
          <motion.div
            layout
            key={doc.id}
            className="inline-block w-full h-auto my-4 opacity-100 md:my-0"
          >
            <Img
              url={doc.url}
              width={doc.width}
              height={doc.height}
              tags={doc.selectedTags}
              isAnonymous={doc.isAnonymous}
            />
          </motion.div>
        ))}
    </div>
  );
}

export default ImageList;
