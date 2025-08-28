import React from "react";
import { useStopwatch } from "react-timer-hook";
import { Button, Badge } from "react-bootstrap";

function SleepTimer({ sleepInProgress, onEnd }) {
  const { seconds, minutes, hours } = useStopwatch({ autoStart: true });

  const startTimeStr = sleepInProgress
    ? new Date(sleepInProgress.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : "";

  return (
    <div className="mb-3">
      <h5>Início: {startTimeStr}</h5>
      <h4>
        Tempo decorrido: <Badge bg="info">{String(hours).padStart(2,'0')}:{String(minutes).padStart(2,'0')}:{String(seconds).padStart(2,'0')}</Badge>
      </h4>
      <Button variant="success" onClick={onEnd} className="mt-2">Finalizar Soneca</Button>
    </div>
  );
}

export default SleepTimer;
