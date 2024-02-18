import { createClient, LiveClient, LiveTranscriptionEvents } from "@deepgram/sdk";
import { useQueue } from "@uidotdev/usehooks";
import { useAsyncFn } from "react-use";

import { useCallback, useEffect, useState } from "react";

const apiKey = import.meta.env.VITE_DEEPGRAM_API_KEY;

export default function useMicrophone() {
  const { add, remove, first, size, queue } = useQueue<any>([]);
  const [connection, setConnection] = useState<LiveClient | null>(null);
  const [isListening, setListening] = useState(false);
  const [isProcessing, setProcessing] = useState(false);
  const [microphone, setMicrophone] = useState<MediaRecorder | null>(null);
  const [userMedia, setUserMedia] = useState<MediaStream | null>(null);
  const [caption, setCaption] = useState<string | null>(null);

  const toggleMicrophone = useCallback(async () => {
    if (microphone && userMedia) {
      setUserMedia(null);
      setMicrophone(null);
      microphone.stop();
    } else {
      const userMedia = await navigator.mediaDevices.getUserMedia({ audio: true });
      const newMicrophone = new MediaRecorder(userMedia);

      newMicrophone.start(500);
      newMicrophone.ondataavailable = e => add(e.data);

      setUserMedia(userMedia);
      setMicrophone(newMicrophone);
    }
  }, [add, microphone, userMedia]);

  const [connectionStatus, connect] = useAsyncFn(async () => {
    return new Promise<void>(resolve => {
      setCaption("");

      const deepgram = createClient(apiKey || "");
      const newConnection = deepgram.listen.live({
        model: "nova-2",
        interim_results: true,
        punctuate: true,
        smart_format: true,
        language: "es",
      });

      const handleOpen = () => {
        setListening(true);
      };

      const handleClose = () => {
        setListening(false);
        setConnection(null);
        resolve();
      };

      const handleTranscript = (data: any) => {
        if (data.is_final) {
          const words = data.channel.alternatives[0].transcript;
          setCaption(prevCaption => (prevCaption || "") + words + " ");
        }
      };

      newConnection.on(LiveTranscriptionEvents.Open, handleOpen);
      newConnection.on(LiveTranscriptionEvents.Close, handleClose);
      newConnection.on(LiveTranscriptionEvents.Transcript, handleTranscript);

      setConnection(newConnection);
    });
  }, [apiKey]);

  useEffect(() => {
    const processQueue = async () => {
      if (size > 0 && !isProcessing) {
        setProcessing(true);

        if (isListening) {
          const blob = first;
          connection?.send(blob);
          remove();
        }

        setTimeout(() => setProcessing(false), 250);
      }
    };

    processQueue();
  }, [connection, queue, remove, first, size, isProcessing, isListening]);

  console.log(caption);

  return {
    toggleMicrophone,
    microphone,
    connect,
    connectionStatus,
    caption,
  };
}
