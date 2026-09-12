import { useCallback, useRef, useState } from 'react';

/**
 * Tek bir video kartı için mikrofon kaydı mantığı.
 * Kullanım: bir kez çağrıldığında kayıt başlar, ikinci çağrıda durur ve
 * kaydedilen sesi otomatik olarak geri oynatır (shadowing kıyaslaması için).
 */
export function useMicRecorder({ onError } = {}) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);

  const stopStreamTracks = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        const playback = new Audio(url);
        playback.play().catch(() => {
          /* otomatik oynatma engellenirse sessizce geç — kullanıcı zaten mikrofona bastı, jest izni var normalde */
        });
        stopStreamTracks();
      };

      recorder.start();
      setIsRecording(true);
    } catch (err) {
      onError?.('Mikrofona erişilemedi. Tarayıcı izinlerini kontrol edin.');
    }
  }, [onError]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  }, []);

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }, [isRecording, startRecording, stopRecording]);

  // Kart ekrandan çıktığında (kaydırıldığında) kaydı zorla durdurmak için dışa açık
  const cancelIfActive = useCallback(() => {
    if (isRecording) stopRecording();
  }, [isRecording, stopRecording]);

  return { isRecording, toggleRecording, cancelIfActive };
}
