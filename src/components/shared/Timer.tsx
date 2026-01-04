import { use, useState } from 'react';
import { useEffect } from 'react';
import { set } from 'zod';

export default function Timer() {
  let seconds = 30;
  const [time, setTime] = useState(seconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) {
          setIsRunning(false);
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId); //isRunning verandert van true naar false,dat is een dependency change. React ruimt op vóór het effect opnieuw draait
  }, [isRunning, seconds]); //Alle variabelen die je gebruikt IN het effect, moeten in de dependency array, dus ook seconds.Dit zorgt ervoor dat je effect altijd met de meest recente waarden werkt!
  useEffect(() => {
    if (time === 0 && isRunning) {
      // Pieptoon afspelen
      console.log('Piep');
      const ctx = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = ctx.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.value = 880; // Frequentie in Hz
      oscillator.connect(ctx.destination);
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
        ctx.close();
      }, 300); // 300 ms piep
    }
  }, [time, isRunning]);

  const handleClick = () => {
    setTime(seconds);
    setIsRunning(true);
  };

  return (
    <>
      <h2></h2>
      <div
        style={{
          color: isRunning ? 'var(--color-accent)' : 'var(--color-text-light)',

          fontFamily: 'var(--font-mono)',
          marginBottom: 'var(--space-8)',
        }}
      >
        {time === 0 ? (
          <p>
            30 seconden voorbij – controleer je waarden en tik op ‘Observatie
            toevoegen’
          </p>
        ) : (
          <>
            <p>
              {' '}
              Observeer 30 seconden en vul ondertussen de velden in <br />
            </p>
            <p style={{ fontSize: '2rem', fontWeight: '600' }}>
              {' '}
              00:{time < 10 ? '0' : ''}
              {time}
            </p>
          </>
        )}
      </div>

      <button onClick={handleClick} disabled={isRunning}>
        {isRunning
          ? 'Observatie loopt...'
          : time === 0
          ? 'Nieuwe observatie'
          : 'Start observatie'}
      </button>
    </>
  );
}
