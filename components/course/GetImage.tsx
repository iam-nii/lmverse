import Image from "next/image";

function GetImage({
  course_title,
  course_file_key,
}: {
  course_title: string;
  course_file_key: string;
}) {
  const imageURL = `${process.env.NEXT_PUBLIC_SELECTEL_COURSE_IMAGES_MAIN_DOMAIN}/${course_file_key}`;

  return (
    <div className="relative aspect-video w-full">
      <Image
        src={imageURL}
        alt={course_title}
        fill
        className="relative z-20 aspect-video w-full object-cover"
        onError={() => {
          // Handle broken images gracefully
          console.warn(`Failed to load image: ${imageURL}`);
        }}
      />
    </div>
  );
}

export default GetImage;
