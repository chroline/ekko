export async function playAudio(data: Iterable<number>) {
  const mp3Data = new Uint8Array(data);

  // @ts-ignore
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  const audioBuffer = await audioContext.decodeAudioData(mp3Data.buffer);

  const sourceNode = audioContext.createBufferSource();
  sourceNode.buffer = audioBuffer;

  // Connect the source node to the audio context's destination (i.e., speakers)
  sourceNode.connect(audioContext.destination);

  // Start playing the audio
  sourceNode.start(0);
}
