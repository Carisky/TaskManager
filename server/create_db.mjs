import knexConfig from './knexfile.mjs';
import Knex from 'knex';
import { config as configDotenv } from 'dotenv';

// Загружаем переменные окружения из файла .env
configDotenv();

/**
 * Асинхронная функция для создания базы данных, если её не существует.
 * Использует параметры подключения из конфигурационного файла knexfile.mjs.
 * @returns {Promise<void>} - Промис, который разрешается после создания базы данных.
 */
async function createDatabaseIfNotExists() {
    const databaseName = knexConfig.development.connection.database;
  
    // Создаем экземпляр Knex для подключения к базе данных MySQL
    const knexInstance = Knex({
      client: knexConfig.development.client,
      connection: {
        host: knexConfig.development.connection.host,
        port: knexConfig.development.connection.port,
        user: knexConfig.development.connection.user,
        password: knexConfig.development.connection.password,
      },
    });
  
    // Проверяем существование базы данных
    const dbInfo = await knexInstance.raw(`SHOW DATABASES LIKE ?`, [databaseName]);
    const ifDbExist = dbInfo[0].length;
  
    // Если базы данных нет, создаем её
    if (!ifDbExist) {
      await knexInstance.raw(`CREATE DATABASE ??`, [databaseName]);
      console.log(`Database '${databaseName}' created.`);
    } else {
      console.log(`Database '${databaseName}' already exists.`);
    }
  
    // Не забываем уничтожить пул соединений при завершении
    await knexInstance.destroy();
}

// Вызываем функцию для создания базы данных при необходимости
createDatabaseIfNotExists();
