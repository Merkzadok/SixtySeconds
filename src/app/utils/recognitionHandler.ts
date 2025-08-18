export const createRecognition = (
  setFullTranscript: React.Dispatch<React.SetStateAction<string>>,
  setInterimTranscript: React.Dispatch<React.SetStateAction<string>>,
  setListening: React.Dispatch<React.SetStateAction<boolean>>
): SpeechRecognition | null => {
  const SpeechRecognitionConstructor =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

  if (!SpeechRecognitionConstructor) {
    alert("Таны браузер ярианы таних функцийг дэмжихгүй байна!");
    return null;
  }

  const recognition = new SpeechRecognitionConstructor();
  recognition.lang = "mn-MN";
  recognition.interimResults = true;
  recognition.continuous = true;

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    let interim = "";
    let final = "";

    for (let i = event.resultIndex; i < event.results.length; ++i) {
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

  recognition.onerror = (event: any) => {
    console.error("Speech recognition error", event);
  };

  recognition.onend = () => {
    setListening(false);
  };

  return recognition;
};
