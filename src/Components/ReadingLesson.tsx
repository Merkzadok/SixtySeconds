import React, { useState, useEffect } from 'react';
import { Volume2, RotateCcw, CheckCircle, XCircle, Mic, MicOff } from 'lucide-react';
import { AppPage } from '@/app/page';

interface ReadingLessonProps {
  onNavigate: (page: AppPage) => void;
  user: {
    name: string;
    score: number;
  };
  setUser: (user: any) => void;
}

const ReadingLesson: React.FC<ReadingLessonProps> = ({ onNavigate, user, setUser }) => {
  const sentences = [
    "The cat sat on the mat.",
    "I love to read books.",
    "The sun is shining bright.",
    "My dog likes to play.",
    "We go to school every day.",
    "The bird sings a happy song.",
    "I can run very fast.",
    "The flowers smell so sweet.",
    "My mom makes delicious cookies.",
    "The rainbow has many colors."
  ];

  const [currentSentence, setCurrentSentence] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [progress, setProgress] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [recordings, setRecordings] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    setProgress((currentSentence / sentences.length) * 100);
  }, [currentSentence, sentences.length]);

  const handleRecordStart = () => {
    setIsRecording(true);
    setFeedback(null);
    setAudioChunks([]);

    // Start recording
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        
        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            setAudioChunks(prev => [...prev, event.data]);
          }
        };
        
        recorder.onstop = () => {
          stream.getTracks().forEach(track => track.stop());
          setIsRecording(false);
          
          // Create audio blob and save recording
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          
          // Save recording for this sentence
          setRecordings(prev => ({
            ...prev,
            [currentSentence]: audioUrl
          }));
          
          // Store in user data for parent dashboard
          const recordingData = {
            sentence: sentences[currentSentence],
            audioUrl: audioUrl,
            timestamp: new Date().toISOString(),
            accuracy: Math.random() > 0.2 ? Math.floor(Math.random() * 15) + 85 : Math.floor(Math.random() * 20) + 60
          };
          
          // Add to user's recordings
          const updatedUser = {
            ...user,
            recordings: [...((user as any).recordings || []), recordingData]
          };
          setUser(updatedUser);
          
          // Simulate speech recognition result (80% success rate)
          const isCorrect = Math.random() > 0.2;
          setFeedback(isCorrect ? 'correct' : 'incorrect');
          
          if (isCorrect) {
            setShowCelebration(true);
            setTimeout(() => {
              setShowCelebration(false);
              if (currentSentence < sentences.length - 1) {
                setCurrentSentence(prev => prev + 1);
              } else {
                // Lesson completed
                setUser({
                  ...updatedUser,
                  score: updatedUser.score + 50,
                  lessonsCompleted: (updatedUser as any).lessonsCompleted + 1
                });
                setTimeout(() => onNavigate('exercises'), 2000);
              }
              setFeedback(null);
            }, 2000);
          }
        };
        
        recorder.start();
        
        // Auto-stop recording after 5 seconds
        setTimeout(() => {
          if (recorder.state === 'recording') {
            recorder.stop();
          }
        }, 5000);
      })
      .catch(error => {
        console.error('Error accessing microphone:', error);
        setIsRecording(false);
        // Fallback to simulation if microphone access fails
        setTimeout(() => {
          const isCorrect = Math.random() > 0.2;
          setFeedback(isCorrect ? 'correct' : 'incorrect');
          
          if (isCorrect) {
            setShowCelebration(true);
            setTimeout(() => {
              setShowCelebration(false);
              if (currentSentence < sentences.length - 1) {
                setCurrentSentence(prev => prev + 1);
              } else {
                setUser({
                  ...user,
                  score: user.score + 50,
                  lessonsCompleted: (user as any).lessonsCompleted + 1
                });
                setTimeout(() => onNavigate('exercises'), 2000);
              }
              setFeedback(null);
            }, 2000);
          }
        }, 2000);
      });
  };

  const handleRecordStop = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
    }
  };

  const handleTryAgain = () => {
    setFeedback(null);
  };

  const speakSentence = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(sentences[currentSentence]);
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen pt-16 flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Progress Bar */}
      <div className="bg-white shadow-sm border-b-2 border-blue-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-gray-800">Reading Practice</h2>
            <span className="text-sm font-semibold text-gray-600">
              {currentSentence + 1} of {sentences.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-3xl mx-auto text-center">
          {showCelebration && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-20">
              <div className="bg-white rounded-2xl p-8 shadow-2xl animate-pulse">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-green-600 mb-2">Excellent!</h3>
                <p className="text-gray-600">Great job reading that sentence!</p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-3xl shadow-xl p-12 border-4 border-blue-200">
            <div className="mb-8">
              <div className="flex items-center justify-center mb-6">
                <button
                  onClick={speakSentence}
                  className="flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full hover:bg-blue-200 transition-colors"
                >
                  <Volume2 className="h-4 w-4" />
                  <span className="text-sm font-semibold">Listen</span>
                </button>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800 leading-relaxed mb-8">
                "{sentences[currentSentence]}"
              </h3>
            </div>

            <div className="space-y-6">
              {feedback === null && (
                <div>
                  <button
                    onClick={handleRecordStart}
                    disabled={isRecording}
                    className={`w-full max-w-md mx-auto block px-8 py-6 rounded-2xl font-bold text-xl transition-all duration-200 shadow-lg ${
                      isRecording
                        ? 'bg-red-500 text-white animate-pulse cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:scale-105'
                    }`}
                  >
                    {isRecording ? (
                      <div className="flex items-center justify-center space-x-2">
                        <MicOff className="h-6 w-6" />
                        <span>Recording... (Click to stop)</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Mic className="h-6 w-6" />
                        <span>Click to Record</span>
                      </div>
                    )}
                  </button>
                  
                  {isRecording && (
                    <button
                      onClick={handleRecordStop}
                      className="mt-4 bg-red-500 text-white px-6 py-2 rounded-xl font-semibold hover:bg-red-600 transition-colors"
                    >
                      Stop Recording
                    </button>
                  )}
                  
                  {!isRecording && (
                    <p className="text-gray-600 mt-4">
                      Click the button and read the sentence out loud
                    </p>
                  )}
                  
                  {recordings[currentSentence] && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                      <p className="text-sm text-blue-700 mb-2">Your recording:</p>
                      <audio controls className="w-full">
                        <source src={recordings[currentSentence]} type="audio/wav" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}
                </div>
              )}

              {feedback === 'correct' && (
                <div className="bg-green-100 border-2 border-green-300 rounded-2xl p-6">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-green-800 mb-2">Perfect!</h4>
                  <p className="text-green-700">You read that sentence beautifully! 🌟</p>
                </div>
              )}

              {feedback === 'incorrect' && (
                <div className="bg-orange-100 border-2 border-orange-300 rounded-2xl p-6">
                  <XCircle className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-orange-800 mb-2">Let's try that again!</h4>
                  <p className="text-orange-700 mb-4">Take your time and try reading it once more.</p>
                  <button
                    onClick={handleTryAgain}
                    className="bg-orange-500 text-white px-6 py-2 rounded-xl font-semibold hover:bg-orange-600 transition-colors flex items-center space-x-2 mx-auto"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Try Again</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {currentSentence === sentences.length - 1 && feedback === 'correct' && (
            <div className="mt-8 bg-yellow-100 border-2 border-yellow-300 rounded-2xl p-6">
              <div className="text-4xl mb-2">🏆</div>
              <h3 className="text-2xl font-bold text-yellow-800 mb-2">Lesson Complete!</h3>
              <p className="text-yellow-700">Moving on to fun exercises next!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ReadingLesson