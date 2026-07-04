import { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";
import { Folder, FolderOpen, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { PdfDoc, WordDoc } from "@/constants/images";
import Image from "next/image";
import { ACCEPTED_FILE_TYPES } from "@/types/types";

type DocumentUploaderTypes = {
  path: string;
  maxFiles: number;
  maxSize: number;
  onChange: (file: string) => void;
  fileType: "docs" | "images" | "videos";
};

function DocumentUploader({
  path,
  maxFiles,
  maxSize,
  fileType,
  onChange,
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
      success?: boolean;
      objectURL?: string; // The object URL of the file
    }>
  >([]);

  const canUpload = files.length < maxFiles;

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.objectURL?.startsWith("blob:")) {
          URL.revokeObjectURL(file.objectURL);
        }
      });
    };
  }, []);
  const updateFile = (
    fileId: string,
    updates: Partial<(typeof files)[number]>
  ) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === fileId ? { ...f, ...updates } : f))
    );
  };

  async function uploadFile(fileId: string, file: File) {
    updateFile(fileId, {
      uploading: true,
      progress: 0,
      error: false,
    });

    try {
      const presignedResponse = await fetch("/api/s3/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
          size: file.size,
          isImage: true,
          path,
          allowedTypes: ACCEPTED_FILE_TYPES[fileType],
        }),
      });
      console.log(presignedResponse);

      if (!presignedResponse.ok) {
        throw new Error("Failed to get presigned URL");
      }

      const { preSignedURL, key } = await presignedResponse.json();

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentageCompleted = (event.loaded / event.total) * 100;

            setFiles((prev) =>
              prev.map((file) =>
                file.id === fileId
                  ? { ...file, process: Math.round(percentageCompleted) }
                  : file
              )
            );
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 204) {
            resolve();
          } else {
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        };

        xhr.onerror = () => {
          reject(new Error("Network error during upload"));
        };

        xhr.open("PUT", preSignedURL);

        xhr.setRequestHeader("Content-Type", file.type);

        xhr.send(file);
      });

      updateFile(fileId, {
        uploading: false,
        progress: 100,
        key,
      });

      onChange(key);

      toast.success("File uploaded successfully");
    } catch (error) {
      console.error(error);

      updateFile(fileId, {
        uploading: false,
        progress: 0,
        error: true,
        success: false,
      });
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to upload file");
      }
    }
  }

  async function removeFile(fileId: string) {
    const file = files.find((file) => file.id === fileId);
    if (file && file.isDeleting) return;
    try {
      setFiles((prev) =>
        prev.map((f) => (f.id === file?.id ? { ...f, isDeleting: true } : f))
      );

      console.log("Sending file key to backend");
      if (file?.key) {
        await fetch("/api/s3/delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileKey: file?.key,
          }),
        });
      }

      setFiles((prev) => {
        if (file?.objectURL?.startsWith("blob:")) {
          URL.revokeObjectURL(file.objectURL);
        }
        return prev.filter((f) => f.id !== file?.id);
      });
    } catch (error) {
      setFiles((prev) =>
        prev.map((f) => (f.id === fileId ? { ...f, isDeleting: false } : f))
      );
    }
  }
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0 && canUpload) {
        const uploadFiles = acceptedFiles.map((file) => {
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
        });
        setFiles((previousFiles) => [...previousFiles, ...uploadFiles]);

        uploadFiles.forEach((item) => {
          uploadFile(item.id, item.file);
        });
      } else {
        toast.error(`You can only upload ${maxFiles} files`);
      }
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
              <div className="relative">
                <Image
                  src={file.objectURL}
                  alt={file.file.name}
                  width={200}
                  height={300}
                />
                <X
                  onClick={() => removeFile(file.id)}
                  className="absolute top-0 right-0 cursor-pointer"
                  size={20}
                />
              </div>
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
