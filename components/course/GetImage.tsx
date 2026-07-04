import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function GetImage({
  course_title,
  course_file_key,
}: {
  course_title: string;
  course_file_key: string;
}) {
  const [imageURL, setImageURL] = useState<string | undefined>(undefined);
  useEffect(() => {
    const getImageURL = async () => {
      const imageURLResponse = await fetch("/api/s3/get-image", {
        method: "POST",
        body: JSON.stringify({
          fileKey: course_file_key,
        }),
      });
      const data = await imageURLResponse.json();
      if (!data.success) {
        toast.error(data.error);
      }
      console.log(data);
      setImageURL(data.data);
    };
    getImageURL();
  }, []);
  return (
    <div className="relative aspect-video w-full">
      {imageURL && (
        <Image
          src={imageURL || ""}
          alt={course_title}
          fill
          className="relative z-20 aspect-video w-full object-cover"
        />
      )}
    </div>
  );
}

export default GetImage;
