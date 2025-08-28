import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SleepForm = ({ addSleep }) => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!start || !end) return;

    const startTime = new Date(start);
    const endTime = new Date(end);
    const duration = (endTime - startTime) / (1000 * 60 * 60);

    const sleep = {
      date: startTime.toLocaleDateString("pt-BR"), 
      start: startTime.toISOString(),
      end: endTime.toISOString(),
      duration: duration.toFixed(2)
    };

    addSleep(sleep);
    setStart("");
    setEnd("");
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group className="mb-2">
        <Form.Label>Início</Form.Label>
        <Form.Control
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Fim</Form.Label>
        <Form.Control
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
      </Form.Group>
      <Button type="submit">Registrar Soneca</Button>
    </Form>
  );
};

export default SleepForm;
