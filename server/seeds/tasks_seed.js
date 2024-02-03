// seeds/seed_tasks.js

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(async function () {
      // Inserts seed entries
      const tasks = [];
      for (let i = 0; i < 20; i++) {
        tasks.push({
          title: `Task ${i + 1}`,
          due_date: new Date(), // You can adjust this as needed
          description: `Description for Task ${i + 1}`,
          tags: `Tag${i + 1}`,
          priority: Math.floor(Math.random() * 3) + 1, // Random priority between 1 and 3
          created_at: new Date(),
          updated_at: new Date(),
        });
      }

      await knex('tasks').insert(tasks);
    });
};
