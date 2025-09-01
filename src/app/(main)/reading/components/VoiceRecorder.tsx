"use client";

import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { ReactMediaRecorder } from "react-media-recorder";

export type VoiceRecorderHandle = {
  start: () => void;
  stop: () => Promise<void>;
};

type Props = {
  onUploadComplete?: (url: string | null) => void;
};

type RecorderRenderProps = {
  status: string;
  startRecording: () => void;
  stopRecording: () => void;
  mediaBlob?: Blob | null;
  mediaBlobUrl?: string | null;
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

        setTimeout(async () => {
          const blob = mediaBlobRef.current;
          if (blob) {
            const url = await uploadToCloudinary(blob);
            onUploadComplete?.(url);
          } else if (mediaBlobUrlRef.current) {
            try {
              const response = await fetch(mediaBlobUrlRef.current);
              const fetchedBlob = await response.blob();
              const url = await uploadToCloudinary(fetchedBlob);
              onUploadComplete?.(url);
            } catch (error) {
              onUploadComplete?.(null);
            }
          } else {
            onUploadComplete?.(null);
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
          { method: "POST", body: formData }
        );
        const data: { secure_url?: string } = await response.json();
        return data.secure_url ?? null;
      } catch (error) {
        return null;
      }
    };

    return (
      <ReactMediaRecorder
        audio
        render={(props: RecorderRenderProps) => {
          const { startRecording, stopRecording, mediaBlob, mediaBlobUrl } =
            props;

          startRecordingInternal = startRecording;
          stopRecordingInternal = stopRecording;

          if (mediaBlob) mediaBlobRef.current = mediaBlob;
          if (mediaBlobUrl) mediaBlobUrlRef.current = mediaBlobUrl;

          return <div className="hidden" />;
        }}
      />
    );
  }
);

VoiceRecorder.displayName = "VoiceRecorder";

export default VoiceRecorder;
