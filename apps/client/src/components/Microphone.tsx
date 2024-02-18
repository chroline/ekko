"use client";

import { LiveClient, LiveTranscriptionEvents, createClient } from "@deepgram/sdk";
import { useQueue } from "@uidotdev/usehooks";

import { useState, useEffect, useCallback } from "react";

export default function Microphone() {
  const { add, remove, first, size, queue } = useQueue<any>([]);
  const [connection, setConnection] = useState<LiveClient | null>(null);
  const [isListening, setListening] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isProcessing, setProcessing] = useState(false);
  const [micOpen, setMicOpen] = useState(false);
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
      const microphone = new MediaRecorder(userMedia);

      microphone.start(500);
      microphone.onstart = () => setMicOpen(true);
      microphone.onstop = () => setMicOpen(false);
      microphone.ondataavailable = e => add(e.data);

      setUserMedia(userMedia);
      setMicrophone(microphone);
    }
  }, [add, microphone, userMedia]);

  useEffect(() => {
    if (apiKey) {
      const deepgram = createClient(apiKey ?? "");
      const connection = deepgram.listen.live({
        model: "nova-2",
        interim_results: true,
        punctuate: true,
        smart_format: true,
        language: "es",
      });

      const handleOpen = () => {
        console.log("connection established");
        setListening(true);
      };

      const handleClose = () => {
        console.log("connection closed");
        setListening(false);
        setConnection(null);
      };

      const handleTranscript = data => {
        if (data.is_final) {
          const words = data.channel.alternatives[0].transcript;
          setCaption(caption => (caption || "") + words + " ");
        }
      };

      connection.on(LiveTranscriptionEvents.Open, handleOpen);
      connection.on(LiveTranscriptionEvents.Close, handleClose);
      connection.on(LiveTranscriptionEvents.Transcript, handleTranscript);

      setConnection(connection);
      setLoading(false);
    }
  }, []);

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

  if (isLoading) return <span className="w-full text-center">Loading the app...</span>;

  return (
    <div className="relative w-full">
      <div className="mt-10 flex flex-col items-center align-middle">
        <button className="h-24 w-24" onClick={toggleMicrophone}>
          Toggle
        </button>
        <div className="mt-20 p-6 text-center text-xl">
          {caption && micOpen ? caption : "** Realtime transcription by Deepgram **"}
        </div>
      </div>
      <div className="fixed bottom-0 right-5 z-20 mb-5 mr-1 flex shrink-0 grow-0 items-center justify-around gap-5 rounded-lg text-white lg:mb-5 lg:mr-5 xl:mb-10 xl:mr-10">
        <span className="text-sm text-gray-400">
          {isListening ? "Deepgram connection open!" : "Deepgram is connecting..."}
        </span>
      </div>
    </div>
  );
}
