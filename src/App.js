import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import WeeklyHistory from "./WeeklyHistory";
import SleepTimer from "./SleepTimer";
import SleepForm from "./SleepForm";

function App() {
  const [sleeps, setSleeps] = useState(() => JSON.parse(localStorage.getItem("sleeps") || "[]"));
  const [sleepInProgress, setSleepInProgress] = useState(() => JSON.parse(localStorage.getItem("sleepInProgress")));
  const [showManualForm, setShowManualForm] = useState(false);

  const clearHistory = () => {
    if (window.confirm("Tem certeza que deseja apagar todo o histórico?")) {
      setSleeps([]);
      localStorage.removeItem("sleeps");
    }
  };

  const startSleep = () => {
    const newSleep = {
      date: new Date().toLocaleDateString("pt-BR"),
      start: new Date().toISOString(),
      end: null,
      duration: null
    };
    setSleepInProgress(newSleep);
    localStorage.setItem("sleepInProgress", JSON.stringify(newSleep));
  };

  const endSleep = () => {
    if (!sleepInProgress) return;
    const endTime = new Date();
    const finishedSleep = {
      ...sleepInProgress,
      end: endTime.toISOString(),
      duration: ((endTime - new Date(sleepInProgress.start)) / (1000*60*60)).toFixed(2)
    };
    const updated = [...sleeps, finishedSleep];
    setSleeps(updated);
    localStorage.setItem("sleeps", JSON.stringify(updated));
    localStorage.removeItem("sleepInProgress");
    setSleepInProgress(null);
  };

  const addManualSleep = (sleep) => {
    const updated = [...sleeps, sleep];
    setSleeps(updated);
    localStorage.setItem("sleeps", JSON.stringify(updated));
  };

  const deleteSleep = (dateStr, index) => {
    const sleepsByDate = {};
    sleeps.forEach(record => {
      const key = new Date(record.start).toLocaleDateString("pt-BR");
      if (!sleepsByDate[key]) sleepsByDate[key] = [];
      sleepsByDate[key].push(record);
    });
    sleepsByDate[dateStr].splice(index, 1);
    const updated = Object.values(sleepsByDate).flat();
    setSleeps(updated);
    localStorage.setItem("sleeps", JSON.stringify(updated));
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Soneca Bernardo</h1>

      {sleepInProgress ? (
        <SleepTimer sleepInProgress={sleepInProgress} onEnd={endSleep} />
      ) : (
        <Button onClick={startSleep} className="mb-3">Iniciar Soneca</Button>
      )}

      {!sleepInProgress && (
        <Button 
          variant="secondary" 
          className="mb-3 ms-2" 
          onClick={() => setShowManualForm(!showManualForm)}
        >
          {showManualForm ? "Fechar Registro Manual" : "Registrar Soneca Manual"}
        </Button>
      )}

      {!sleepInProgress && showManualForm && <SleepForm addSleep={addManualSleep} />}

      <WeeklyHistory sleeps={sleeps} deleteSleep={deleteSleep} />

      {sleeps.length > 0 && (
        <Button variant="danger" className="mt-3" onClick={clearHistory}>Limpar Histórico</Button>
      )}
    </Container>
  );
}

export default App;
