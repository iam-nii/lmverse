"use client";

import React, { useCallback, useEffect, useState } from "react";
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

type UploaderProps = {
  value?: string;
  onChange: (key: string) => void;
};

function Uploader({ value, onChange }: UploaderProps) {
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
      error: false,
      success: false,
    }));

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

            setFileState((prev) => ({
              ...prev,
              progress: Math.round(percentageCompleted),
            }));
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

      setFileState((prev) => ({
        ...prev,
        uploading: false,
        progress: 100,
        key,
        success: true,
      }));

      onChange(key);

      toast.success("File uploaded successfully");
    } catch (error) {
      console.error(error);

      setFileState((prev) => ({
        ...prev,
        uploading: false,
        progress: 0,
        error: true,
        success: false,
      }));

      toast.error("Failed to upload file");
    }
  }

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) return;

      const file = acceptedFiles[0];

      if (fileState.objectUrl && fileState.objectUrl.startsWith("blob:")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }

      const previewUrl = URL.createObjectURL(file);

      setFileState({
        file,
        uploading: false,
        progress: 0,
        objectUrl: previewUrl,
        error: false,
        id: uuidv4(),
        isDeleting: false,
        fileType: "image",
        success: false,
      });

      await uploadFile(file);
    },
    [fileState.objectUrl]
  );

  async function handleRemoveFile() {
    if (fileState.isDeleting) return;
    console.log("Removing file: uploader.tsx");

    try {
      setFileState((prev) => ({
        ...prev,
        isDeleting: true,
      }));

      console.log("Sending file key to backend");
      if (fileState.key) {
        await fetch("/api/s3/delete", {
          method: "POST",
          body: JSON.stringify({
            fileKey: fileState.key,
          }),
        });
      }

      if (fileState.objectUrl && fileState.objectUrl.startsWith("blob:")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }

      setFileState({
        error: false,
        file: null,
        fileType: "image",
        id: null,
        isDeleting: false,
        progress: 0,
        uploading: false,
        success: false,
      });

      onChange("");

      toast.success("File removed");
    } catch (error) {
      console.error(error);

      setFileState((prev) => ({
        ...prev,
        isDeleting: false,
      }));

      toast.error("Failed to remove file");
    }
  }

  function onFileReject(fileRejection: FileRejection[]) {
    if (!fileRejection.length) return;

    const hasTooManyFiles = fileRejection.some(
      (rejection) => rejection.errors[0]?.code === "too-many-files"
    );

    const hasFileTooLarge = fileRejection.some(
      (rejection) => rejection.errors[0]?.code === "file-too-large"
    );

    if (hasTooManyFiles) {
      toast.error("Too many files selected. Max is 1");
    } else if (hasFileTooLarge) {
      toast.error("File is too large. Max size is 5MB");
    } else {
      toast.error("File rejected");
    }

    setFileState((prev) => ({
      ...prev,
      error: true,
    }));
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

    if (fileState.success && fileState.objectUrl) {
      return (
        <RenderSuccessState
          objectUrl={fileState.objectUrl}
          onRemove={handleRemoveFile}
        />
      );
    }

    return <RenderEmptyState isDragActive={isDragActive} />;
  }

  useEffect(() => {
    return () => {
      if (fileState.objectUrl && fileState.objectUrl.startsWith("blob:")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }
    };
  }, [fileState.objectUrl]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024,
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
        fileState.error && "border-destructive",
        fileState.success && "border-green-500/50"
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
