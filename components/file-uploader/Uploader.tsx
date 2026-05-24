"use client";
import React, { useCallback, useEffect, useEffectEvent, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import {
  RenderEmptyState,
  RenderErrorState,
  RenderSuccessState,
  RenderUploadingState,
} from "./RenderState";
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
  success: boolean;
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
    success: false,
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
      await new Promise<void>((resolve, reject) => {
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
            toast.success("File uploaded successfully");
            resolve();
          } else {
            reject(new Error("Failed to upload file..."));
          }

          xhr.onerror = () => {
            reject(new Error("Failed to upload file..."));
          };

          xhr.open("PUT", preSignedURL);
          xhr.setRequestHeader("Content-Type", file.type);
          xhr.send(file);
        };
        xhr.open("PUT", preSignedURL);
        xhr.send(file);
      });
    } catch {
      toast.error("Something went wrong...");
      setFileState((prev) => ({
        ...prev,
        uploading: false,
        progress: 0,
        error: true,
      }));
    }
  }

  async function handleUpload() {
    if (!fileState.file) {
      toast.error("No file selected");
      return;
    }
    // await uploadFile(fileState.file);
    toast.success("File uploaded successfully (mock)");
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        if (fileState.objectUrl && fileState.objectUrl.startsWith("http")) {
          URL.revokeObjectURL(fileState.objectUrl);
        }

        setFileState({
          file: file,
          uploading: false,
          progress: 0,
          objectUrl: URL.createObjectURL(file),
          error: false,
          id: uuidv4(),
          isDeleting: false,
          fileType: "image",
          success: true,
        });
      }
      console.log(acceptedFiles);

      //uploadFile
    },
    [fileState.objectUrl]
  );

  function handleRemoveFile() {
    if (fileState.isDeleting || !fileState.objectUrl) return;

    try {
      setFileState((prev) => ({
        ...prev,
        isDeleting: true,
      }));

      // Route handler for deleting the files.
    } catch (error) {}
  }
  function onFileReject(fileRejection: FileRejection[]) {
    if (!fileRejection.length) {
      toast.error("Nothing caught");
      console.log("Nothing caught");
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
      setFileState((prev) => ({
        ...prev,
        error: true,
      }));
      console.log("Too many files selected. Max is 1");
    } else if (hasFileTooLarge) {
      toast.error("One or more files are too big. Max size is 5MB");
      setFileState((prev) => ({
        ...prev,
        error: true,
      }));
      console.log("One or more files are too big. Max size is 5MB");
    } else {
      toast.error("Files were rejected");
      setFileState((prev) => ({
        ...prev,
        error: true,
      }));
      console.log("Files were rejected");
    }
  }

  function renderContent() {
    if (fileState.error) {
      return <RenderErrorState />;
    }
    if (fileState.uploading) {
      return (
        <RenderUploadingState
          progress={fileState.progress}
          file={fileState.file as File}
        />
      );
    }
    if (fileState.objectUrl) {
      return (
        <RenderSuccessState
          objectUrl={fileState.objectUrl}
          uploadFile={handleUpload}
        />
      );
    }
    return <RenderEmptyState isDragActive={isDragActive} />;
  }

  useEffect(() => {
    return () => {
      if (fileState.objectUrl && fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }
    };
  }, [fileState.objectUrl]);

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
          : "border-border hover:border-primary",
        fileState.error && "border-destructive ",
        fileState.success && "border-green-500/50 "
      )}
    >
      <CardContent className="justify-center flex items-center h-full w-full">
        <input {...getInputProps()} />
        {renderContent()}
      </CardContent>
    </Card>
  );
}

export default Uploader;
