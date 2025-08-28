export const createRecognition = (
  setFullTranscript: React.Dispatch<React.SetStateAction<string>>,
  setInterimTranscript: React.Dispatch<React.SetStateAction<string>>,
  setListening: React.Dispatch<React.SetStateAction<boolean>>
): SpeechRecognition | null => {
  type SpeechRecognitionConstructor = {
    new (): SpeechRecognition;
  };

  interface WindowWithSpeech {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }

  const { SpeechRecognition, webkitSpeechRecognition } =
    window as unknown as WindowWithSpeech;

  const RecognitionConstructor = SpeechRecognition || webkitSpeechRecognition;

  if (!RecognitionConstructor) {
    alert("Таны браузер ярианы таних функцийг дэмжихгүй байна!");
    return null;
  }

  const recognition = new RecognitionConstructor();
  recognition.lang = "mn-MN";
  recognition.interimResults = true;
  recognition.continuous = true;

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    let interim = "";
    let final = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i];
      if (result.isFinal) {
        final += result[0].transcript + " ";
      } else {
        interim += result[0].transcript;
      }
    }

    setFullTranscript((prev) => prev + final);
    setInterimTranscript(interim);
  };

  recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    console.error("Speech recognition error", event);
  };

  recognition.onend = () => {
    setListening(false);
  };

  return recognition;
};
