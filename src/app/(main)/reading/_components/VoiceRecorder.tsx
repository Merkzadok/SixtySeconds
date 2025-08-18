// components/VoiceRecorder.tsx
import React, { forwardRef, useImperativeHandle } from "react";
import { ReactMediaRecorder } from "react-media-recorder";

export type VoiceRecorderHandle = {
  start: () => void;
  stop: () => void;
};

const VoiceRecorder = forwardRef<VoiceRecorderHandle>((_, ref) => {
  let startRecordingInternal: () => void = () => {};
  let stopRecordingInternal: () => void = () => {};

  useImperativeHandle(ref, () => ({
    start: () => startRecordingInternal(),
    stop: () => stopRecordingInternal(),
  }));

  return (
    <div>
      <h3>🎙️ Дуу бичиж байна...</h3>
      <ReactMediaRecorder
        audio
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => {
          startRecordingInternal = startRecording;
          stopRecordingInternal = stopRecording;

          return (
            <div>
              <p>📟 Төлөв: {status}</p>
              {mediaBlobUrl && (
                <div style={{ marginTop: "1rem" }}>
                  <audio src={mediaBlobUrl} controls />
                  <br />
                  <a href={mediaBlobUrl} download="recording.webm">
                    ⬇️ Татаж авах
                  </a>
                </div>
              )}
            </div>
          );
        }}
      />
    </div>
  );
});

export default VoiceRecorder;
