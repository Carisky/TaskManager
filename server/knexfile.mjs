import { Model } from 'objection';
import Knex from 'knex';
import { config as configDotenv } from 'dotenv';

// Загружаем переменные окружения из файла .env
configDotenv();

/**
 * Конфигурация для подключения к базе данных с использованием Knex.
 * @type {Object.<string, import("knex").Knex.Config>}
 */
const knexConfig = {
  development: {
    client: process.env.client, // Тип базы данных (например, 'mysql', 'postgresql')
    connection: {
      host: process.env.host,
      port: process.env.port,
      user: process.env.user,
      password: process.env.password,
      database: process.env.database,
    },
    migrations: {
      tableName: process.env.client,
      loadExtensions: ['.js', '.mjs'],
    },
    seeds: {
      directory: './seeds',
      loadExtensions: ['.js', '.mjs'],
    },
  },
};

// Инициализация Knex и Objection.js
const knex = Knex(knexConfig.development);
Model.knex(knex);

export default knexConfig;
