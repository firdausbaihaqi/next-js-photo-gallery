import Image from "next/image";
import useFirestore from "../../hooks/useFirestore";

function ImageList() {
  const { docs } = useFirestore("images");
  console.log(docs);

  return (
    <div className="relative grid grid-cols-3 gap-5 place-items-center">
      {docs &&
        docs.map((doc) => (
          // <Image src={doc.url} key={doc.id} layout="fill" />
          <img src={doc.url} key={doc.id} className="h-96 " />
        ))}
    </div>
  );
}

export default ImageList;
