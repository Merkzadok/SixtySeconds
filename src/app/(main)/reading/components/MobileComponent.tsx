import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export const MobileSpeechComponent = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // Mobile-specific settings
  const startListening = () => {
    const isMobile =
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    SpeechRecognition.startListening({
      continuous: false, // Don't use continuous on mobile
      language: "mn-MN",
      interimResults: true,
    });

    // Auto-stop after 10 seconds on mobile to prevent issues
    if (isMobile) {
      setTimeout(() => {
        SpeechRecognition.stopListening();
      }, 10000);
    }
  };

  return (
    <div>
      {!browserSupportsSpeechRecognition && (
        <div>Browser doesn support speech recognition.</div>
      )}

      <button
        onClick={listening ? SpeechRecognition.stopListening : startListening}
      >
        {listening ? "Stop" : "Start"}
      </button>

      <p>{transcript}</p>
    </div>
  );
};
