require('dotenv').config({ path: '/var/www/seabot/api/.env' });
const express = require('express');
const cors = require('cors'); // Добавляем cors
const app = express();
const PORT = process.env.PORT || 3001;

// Настраиваем CORS
app.use(cors({
  origin: 'https://rms-bot.com',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// Подключаем роуты
const routes = require('./routes/index');

// Настраиваем middleware
app.use(express.json());
app.use('/seabot-api', routes);

// Запускаем сервер
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});