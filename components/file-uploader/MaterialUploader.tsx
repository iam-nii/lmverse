import { useCallback, useEffect, useEffectEvent, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";
import { Folder, FolderOpen, Plus } from "lucide-react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { PdfDoc, WordDoc } from "@/constants/images";
import Image from "next/image";

type DocumentUploaderTypes = {
  maxFiles: number;
  maxSize: number;
  fileType: "docs" | "images" | "videos";
};
const ACCEPTED_FILE_TYPES = {
  images: {
    "image/*": [],
  },
  docs: {
    "application/pdf": [],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      [], // .docx
  },
  videos: {
    "video/*": [],
  },
} as const;

function DocumentUploader({
  maxFiles,
  maxSize,
  fileType,
}: DocumentUploaderTypes) {
  const [files, setFiles] = useState<
    Array<{
      id: string;
      file: File;
      uploading: boolean;
      progress: number;
      key?: string; // The key of the file in the storage
      isDeleting: boolean;
      error: boolean;
      objectURL?: string; // The object URL of the file
    }>
  >([]);
  const [canUpload, setCanUpload] = useState(true);
  const disableUpload = useEffectEvent(() => {
    setCanUpload(false);
  });

  useEffect(() => {
    if (files.length == maxFiles) {
      disableUpload();
    }
    return;
  }, [files, maxFiles]);

  function uploadFile(file: File) {
    // console.log(file);
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0 && canUpload) {
        // console.log(acceptedFiles[0].type);

        setFiles((previousFiles) => [
          ...previousFiles,
          ...acceptedFiles.map((file) => {
            let objectURL: string;

            if (file.type === "application/pdf") {
              objectURL = PdfDoc.src;
            } else if (
              file.type ===
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ) {
              objectURL = WordDoc.src;
            } else {
              objectURL = URL.createObjectURL(file);
            }
            return {
              id: uuidv4(),
              file: file,
              uploading: false,
              progress: 0,
              isDeleting: false,
              error: false,
              objectURL,
            };
          }),
        ]);
      } else {
        toast.error(`You can only upload ${maxFiles} files`);
      }

      acceptedFiles.forEach(uploadFile);
    },
    [canUpload, maxFiles]
  );

  const onDropRejected = useCallback(
    (fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        const tooManyFiles = fileRejections.find(
          (fileRejection) => fileRejection.errors[0].code === "too-many-files"
        );
        const fileTooLarge = fileRejections.find(
          (fileRejection) => fileRejection.errors[0].code === "file-too-large"
        );
        const invalidFileType = fileRejections.find(
          (fileRejection) =>
            fileRejection.errors[0].code === "file-invalid-type"
        );

        if (tooManyFiles) {
          toast.error(`You can only upload ${maxFiles} files`);
        } else if (fileTooLarge) {
          toast.error(
            `The file size is too large. Max file size is ${maxSize}`
          );
        } else if (invalidFileType) {
          toast.error(`Invalid file type`);
        } else {
          console.log(fileRejections);
          toast.error(`Error uploading file`);
        }
      }
    },
    [maxFiles, maxSize]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    maxFiles,
    maxSize,
    accept: ACCEPTED_FILE_TYPES[fileType],
  });
  return (
    <>
      <Card
        className={cn(
          `relative shadow-none border-2 border-dashed transition-colors duration-200 ease-in-out w-full h-18 p-0`,
          isDragActive
            ? "border-primary bg-primary/10 border-solid"
            : "border-border hover:border-primary"
        )}
        {...getRootProps()}
      >
        <CardContent className="flex flex-col my-4">
          <input {...getInputProps()} />
          {isDragActive ? (
            <div className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-4 text-muted-foreground">
                <FolderOpen size={40} />
                <p className="font-extralight text-gray-400">Drop file(s)</p>
              </div>
              <Plus className="mr-2 text-muted-foreground" size={30} />
            </div>
          ) : (
            <div className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-4 text-muted-foreground">
                <Folder size={40} />
                <p className="font-extralight text-gray-400">
                  Add Lesson files
                </p>
              </div>
              <Plus className="mr-2 text-muted-foreground" size={30} />
            </div>
          )}
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {files.map((file) => (
          <div key={file.id} className="flex flex-col items-center ">
            {file.objectURL && (
              <Image
                src={file.objectURL}
                alt={file.file.name}
                width={200}
                height={300}
              />
            )}
            <p className="text-xl overflow-hidden text-ellipsis w-full">
              {file.file.name}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default DocumentUploader;
