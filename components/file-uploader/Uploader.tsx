"use client";
import React, { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { RenderEmptyState } from "./RenderState";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

interface IUploadState {
  id: string | null;
  fileType: "image" | "video";
  uploading: boolean;
  progress: number;
  file: File | null;
  key?: string;
  isDeleting: boolean;
  error: boolean;
  objectUrl?: string;
}

function Uploader() {
  const [fileState, setFileState] = useState<IUploadState>({
    error: false,
    file: null,
    fileType: "image",
    id: null,
    isDeleting: false,
    progress: 0,
    uploading: false,
  });

  async function uploadFile(file: File) {
    setFileState((prev) => ({
      ...prev,
      uploading: true,
      progress: 0,
    }));

    try {
      //1. Get presigned URL
      const presignedResponse = await fetch("/api/s3/upload", {
        method: "POST",
        headers: { "conten-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
          size: file.size,
          isImage: true,
        }),
      });

      if (!presignedResponse.ok) {
        toast.error("Failed to get presigned URL");
        setFileState((prev) => ({
          ...prev,
          uploading: false,
          progress: 0,
          error: true,
        }));
        return;
      }

      const { preSignedURL, key } = await presignedResponse.json();
      await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentageCompleted = (event.loaded / event.total) * 100;
            setFileState((prev) => ({
              ...prev,
              progress: Math.round(percentageCompleted),
            }));
          }
        };
        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 204) {
            setFileState((prev) => ({
              ...prev,
              uploading: false,
              progress: 100,
              key: key,
            }));
          }
        };
      });
    } catch {}
  }
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFileState({
        file: file,
        uploading: false,
        progress: 0,
        objectUrl: URL.createObjectURL(file),
        error: false,
        id: uuidv4(),
        isDeleting: false,
        fileType: "image",
      });
    }
  }, []);

  function onFileReject(fileRejection: FileRejection[]) {
    if (!fileRejection.length) {
      toast.error("Nothing caught");
      // console.log("Nothing caught");
      return;
    }

    const hasTooManyFiles = fileRejection.some(
      (rejection) => rejection.errors[0]?.code === "too-many-files"
    );

    const hasFileTooLarge = fileRejection.some(
      (rejection) => rejection.errors[0]?.code === "file-too-large"
    );

    if (hasTooManyFiles) {
      toast.error("Too many files selected. Max is 1");
      // console.log("Too many files selected. Max is 1");
    } else if (hasFileTooLarge) {
      toast.error("One or more files are too big. Max size is 5MB");
      // console.log("One or more files are too big. Max size is 5MB");
    } else {
      toast.error("Files were rejected");
      // console.log("Files were rejected");
    }
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024, //5mb
    onDropRejected: onFileReject,
  });
  return (
    <Card
      {...getRootProps()}
      className={cn(
        "relative border-2 border-dashed transition-colors duration-200 ease-in-out w-full h-64",
        isDragActive
          ? "border-primary bg-primary/10 border-solid"
          : "border-border hover:border-primary"
      )}
    >
      <CardContent className="justify-center flex items-center h-full w-full">
        <input {...getInputProps()} />
        <RenderEmptyState isDragActive />
      </CardContent>
    </Card>
  );
}

export default Uploader;
