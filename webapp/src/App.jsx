import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tinkoffData, setTinkoffData] = useState(null);
  const [bybitData, setBybitData] = useState(null);
  const [error, setError] = useState(null);

  const fetchTinkoffData = async () => {
    try {
      const response = await axios.post('/seabot-api/tinkoff');
      setTinkoffData(response.data);
      setError(null);
    } catch (err) {
      setError('Ошибка при запросе к Tinkoff');
      setTinkoffData(null);
    }
  };

  const fetchBybitData = async () => {
    try {
      const response = await axios.get('/seabot-api/bybit');
      setBybitData(response.data);
      setError(null);
    } catch (err) {
      setError('Ошибка при запросе к Bybit');
      setBybitData(null);
    }
  };

  return (
    <div className="App">
      <h1>Seabot Dashboard</h1>
      <div className="button-container">
        <button onClick={fetchTinkoffData}>Получить данные с Тинькофф</button>
        <button onClick={fetchBybitData}>Получить данные с Bybit</button>
      </div>
      {error && <p className="error">{error}</p>}
      {tinkoffData && (
        <div>
          <h2>Tinkoff Data</h2>
          <pre>{JSON.stringify(tinkoffData, null, 2)}</pre>
        </div>
      )}
      {bybitData && (
        <div>
          <h2>Bybit Data</h2>
          <pre>{JSON.stringify(bybitData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;