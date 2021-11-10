import useFirestore from "../../hooks/useFirestore";
import { motion } from "framer-motion";
import Img from "./Img";

function ImageList() {
  const { docs } = useFirestore("images");

  return (
    <div className="w-full gap-6 mt-5 col-count-1 md:col-count-2 lg:col-count-3 ">
      {docs &&
        docs.map((doc) => (
          <motion.div
            whileHover={{ opacity: 0.8 }}
            layout
            key={doc.id}
            className="inline-block w-full h-auto opacity-100"
          >
            <Img url={doc.url} />
          </motion.div>
        ))}
    </div>
  );
}

export default ImageList;
