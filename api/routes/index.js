const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/tinkoff', async (req, res) => {
  console.log('Received POST request to /seabot-api/tinkoff'); // Для отладки
  try {
    const response = await axios.post(
      'https://invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.InstrumentsService/FindInstrument',
      { query: 'SBER', instrumentKind: 'INSTRUMENT_TYPE_SHARE' },
      {
        headers: {
          Authorization: `Bearer ${process.env.TINKOFF_TOKEN}`,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error?.response?.status, error?.response?.data || error.message);
    res.status(500).json({ error: 'Ошибка при запросе к Tinkoff' });
  }
});

router.get('/bybit', async (req, res) => {
  console.log('Received GET request to /seabot-api/bybit'); // Для отладки
  try {
    const response = await axios.get('https://api.bybit.com/v5/market/tickers?category=spot');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при запросе к Bybit' });
  }
});

module.exports = router;