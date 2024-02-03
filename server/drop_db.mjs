import knexConfig from './knexfile.mjs';
import Knex from 'knex';
import { config as configDotenv } from 'dotenv';

// Загружаем переменные окружения из файла .env
configDotenv();

/**
 * Асинхронная функция для удаления базы данных, если она существует.
 * Использует параметры подключения из конфигурационного файла knexfile.mjs.
 * @returns {Promise<void>} - Промис, который разрешается после удаления базы данных.
 */
async function dropDatabaseIfNotExists() {
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
  
    // Если база данных существует, удаляем её
    if (ifDbExist) {
      await knexInstance.raw(`DROP DATABASE ??`, [databaseName]);
      console.log(`Database '${databaseName}' dropped.`);
    } else {
      console.log(`Database '${databaseName}' already dropped.`);
    }
  
    // Не забываем уничтожить пул соединений при завершении
    await knexInstance.destroy();
}

// Вызываем функцию для удаления базы данных при необходимости
dropDatabaseIfNotExists();
