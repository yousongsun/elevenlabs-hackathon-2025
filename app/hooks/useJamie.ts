import { useState, useEffect, useCallback, useRef } from 'react';
import { MockFile, mockFiles } from '../data/mockFiles';

interface UseJamieReturn {
  isListening: boolean;
  toggleListening: () => void;
  transcript: string;
  relevantFiles: MockFile[];
  activeFile: MockFile | null;
  closeFile: () => void;
  openFile: (file: MockFile) => void;
  messages: { role: 'user' | 'assistant'; content: string }[];
}

export const useJamie = (): UseJamieReturn => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [relevantFiles, setRelevantFiles] = useState<MockFile[]>([]);
  const [activeFile, setActiveFile] = useState<MockFile | null>(null);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  
  const recognitionRef = useRef<any>(null);
  const lastProcessedTimeRef = useRef<number>(Date.now());

  // Speech to Text (Browser API)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          let finalTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript + ' ';
            }
          }
          if (finalTranscript) {
            setTranscript((prev) => {
                const newT = prev + finalTranscript;
                // We need to call processTranscript here, but we can't easily access the latest
                // instance of it if it depends on state. Fortunately, it doesn't depend on changing state.
                // However, to be safe, we can move the logic into a useEffect or use a ref for the processor.
                // For this hackathon code, we'll assume the closure captures stable setters.
                // We'll dispatch a custom event or just call the function if we are sure it's safe.
                // Actually, since this effect runs once, 'processTranscript' is the one from first render.
                // If we want to use the latest, we should put 'processTranscript' in a ref.
                processTranscriptRef.current(finalTranscript);
                return newT;
            });
          }
        };
        
        recognition.onerror = (event: any) => {
            console.error('Speech recognition error', event.error);
            // Don't stop listening on minor errors, but maybe on not-allowed
            if (event.error === 'not-allowed') {
                 setIsListening(false);
            }
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const processTranscriptRef = useRef((segment: string) => {});

  const toggleListening = useCallback(() => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  }, [isListening]);

  // Text to Speech
  const speak = async (text: string) => {
    try {
      setIsSpeaking(true);
      const response = await fetch('/api/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const audio = new Audio(URL.createObjectURL(blob));
        audio.onended = () => setIsSpeaking(false);
        await audio.play();
      } else {
          setIsSpeaking(false);
      }
    } catch (error) {
      console.error('Error speaking:', error);
      setIsSpeaking(false);
    }
  };

  // Logic to process transcript
  const processTranscript = useCallback(async (newSegment: string) => {
     const lowerSegment = newSegment.toLowerCase();
     
     // 1. Detect Relevant Files
     mockFiles.forEach(file => {
        const isRelevant = file.keywords.some(k => lowerSegment.includes(k));
        if (isRelevant) {
            setRelevantFiles(prev => {
                if (prev.find(f => f.id === file.id)) return prev;
                return [...prev, file];
            });
        }
     });

     // 2. Detect Commands ("Jamie pull up...")
     if (lowerSegment.includes('jamie') && (lowerSegment.includes('pull') || lowerSegment.includes('open') || lowerSegment.includes('show'))) {
        const targetFile = mockFiles.find(f => 
            f.keywords.some(k => lowerSegment.includes(k)) || 
            lowerSegment.includes(f.name.toLowerCase())
        );

        if (targetFile) {
            setActiveFile(targetFile);
            const response = `Pulling up the ${targetFile.type}, ${targetFile.name}.`;
            setMessages(prev => [...prev, { role: 'user', content: newSegment }, { role: 'assistant', content: response }]);
            await speak(response);
        } else {
             // Ask for clarification?
             // Only speak if we are fairly sure it was a command addressed to us
             const response = "I heard you, but I'm not sure which file you want.";
             // await speak(response); // Maybe too chatty
        }
     }
  }, []); // Dependencies? Empty is fine as it uses functional updates.

  // Keep ref updated
  useEffect(() => {
    processTranscriptRef.current = processTranscript;
  }, [processTranscript]);
  
  const closeFile = () => setActiveFile(null);
  const openFile = (file: MockFile) => setActiveFile(file);

  return {
    isListening,
    isSpeaking,
    toggleListening,
    transcript,
    relevantFiles,
    activeFile,
    closeFile,
    openFile,
    messages
  };
};

