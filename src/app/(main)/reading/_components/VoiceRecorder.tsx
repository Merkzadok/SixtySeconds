"use client";

import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { ReactMediaRecorder } from "react-media-recorder";

export type VoiceRecorderHandle = {
  start: () => void;
  stop: () => Promise<void>;
};

type Props = {
  onUploadComplete?: (url: string | null) => void;
};

const VoiceRecorder = forwardRef<VoiceRecorderHandle, Props>(
  ({ onUploadComplete }, ref) => {
    const mediaBlobRef = useRef<Blob | null>(null);
    const mediaBlobUrlRef = useRef<string | null>(null);

    let startRecordingInternal: () => void = () => {};
    let stopRecordingInternal: () => void = () => {};

    useImperativeHandle(ref, () => ({
      start: () => startRecordingInternal(),
      stop: async () => {
        stopRecordingInternal();

        // 1s хүлээгээд blob ирэхийг хүлээнэ
        setTimeout(async () => {
          const blob = mediaBlobRef.current;
          if (blob) {
            const url = await uploadToCloudinary(blob);
            if (onUploadComplete) onUploadComplete(url);
          } else if (mediaBlobUrlRef.current) {
            try {
              const res = await fetch(mediaBlobUrlRef.current);
              const fetchedBlob = await res.blob();
              const url = await uploadToCloudinary(fetchedBlob);
              if (onUploadComplete) onUploadComplete(url);
            } catch (error) {
              console.error("❌ Failed to fetch blob from URL", error);
              if (onUploadComplete) onUploadComplete(null);
            }
          } else {
            console.warn("⚠️ Blob байхгүй байна.");
            if (onUploadComplete) onUploadComplete(null);
          }
        }, 1000);
      },
    }));

    const uploadToCloudinary = async (blob: Blob): Promise<string | null> => {
      const formData = new FormData();
      formData.append("file", blob);
      formData.append("upload_preset", "recordedAudo");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/daywx3gsj/video/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        if (data.secure_url) {
          console.log("✅ Cloudinary-д хадгаллаа:", data.secure_url);
          return data.secure_url;
        } else {
          console.warn("⚠️ Cloudinary upload амжилтгүй:", data);
          return null;
        }
      } catch (err) {
        console.error("❌ Cloudinary upload error:", err);
        return null;
      }
    };

    return (
      <ReactMediaRecorder
        audio
        render={(props: any) => {
          const {
            status,
            startRecording,
            stopRecording,
            mediaBlob,
            mediaBlobUrl,
          } = props;

          startRecordingInternal = startRecording;
          stopRecordingInternal = stopRecording;

          if (mediaBlob) mediaBlobRef.current = mediaBlob;
          if (mediaBlobUrl) mediaBlobUrlRef.current = mediaBlobUrl;

          return (
            <div className="hidden">
              {/* optionally show recorder status */}
              {/* <p>Status: {status}</p> */}
            </div>
          );
        }}
      />
    );
  }
);

export default VoiceRecorder;
