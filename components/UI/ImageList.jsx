import useFirestore from "../../hooks/useFirestore";
import Image from "next/image";
import { motion } from "framer-motion";

function ImageList() {
  const { docs } = useFirestore("images");
  console.log(docs);

  return (
    <div className="gap-5 mt-5" style={{ columnCount: 3 }}>
      {docs &&
        docs.map((doc) => (
          // <Image src={doc.url} key={doc.id} layout="fill" />
          <motion.div
            whileHover={{ opacity: 0.8 }}
            layout
            key={doc.id}
            className="inline-block w-full h-auto opacity-100"
          >
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              src={doc.url}
              className="block object-cover w-full max-h-[600px] h-full m-5 rounded cursor-pointer"
            />
          </motion.div>
        ))}
    </div>
  );
}

export default ImageList;
