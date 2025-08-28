import React from "react";
import { Card, ListGroup, Badge, Button } from "react-bootstrap";
import { Trash } from 'react-bootstrap-icons';

const WeeklyHistory = ({ sleeps, deleteSleep }) => {
  const sleepsByDate = {};
  sleeps.forEach(record => {
    const dateStr = new Date(record.start).toLocaleDateString("pt-BR");
    if (!sleepsByDate[dateStr]) sleepsByDate[dateStr] = [];
    sleepsByDate[dateStr].push(record);
  });

  const formatDuration = (start, end) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const diffMs = endTime - startTime;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;
  };

  const todayStr = new Date().toLocaleDateString("pt-BR");
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toLocaleDateString("pt-BR");

  const sortedDates = Object.keys(sleepsByDate)
    .map(dateStr => ({ dateStr, dateObj: new Date(sleepsByDate[dateStr][0].start) }))
    .sort((a, b) => b.dateObj - a.dateObj)
    .map(item => item.dateStr);

  return (
    <div className="mt-4">
      <h2>Histórico de Sonecas</h2>
      {sortedDates.length === 0 && <p>Sem registros.</p>}
      {sortedDates.map(dateStr => {
        const firstRecord = sleepsByDate[dateStr][0];
        let dayLabel = "";
        if (dateStr === todayStr) dayLabel = "Hoje";
        else if (dateStr === yesterdayStr) dayLabel = "Ontem";
        else dayLabel = new Date(firstRecord.start).toLocaleDateString("pt-BR", { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });

        return (
          <Card className="mb-3" key={dateStr}>
            <Card.Header className="text-capitalize">{`${dateStr} - ${dayLabel}`}</Card.Header>
            <ListGroup variant="flush">
              {sleepsByDate[dateStr].map((sleep, index) => (
                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                  <div>
                    Início: {new Date(sleep.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} | 
                    Fim: {new Date(sleep.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} | 
                    Duração: <Badge bg="secondary">{formatDuration(sleep.start, sleep.end)}</Badge>
                  </div>
                      <Button
                          variant="danger"
                          size="sm"
                          onClick={() => {
                              if (window.confirm("Tem certeza que deseja apagar esta soneca?")) {
                                  deleteSleep(dateStr, index);
                              }
                          }}
                      >
                          <Trash />
                      </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        );
      })}
    </div>
  );
};

export default WeeklyHistory;
