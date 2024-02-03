/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("projects", function (table) {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.text("description");
    table.timestamps(true, true);
  })
  .then(() => {
    return knex.schema.createTable("tasks", function (table) {
      table.increments("id").primary();
      table.string("title").notNullable();
      table.dateTime("due_date").notNullable();
      table.text("description");
      table.string("tags");
      table.integer("priority").notNullable();
      table.integer('project_id').unsigned().nullable();
      table.boolean('is_done').defaultTo(false);
      table.foreign('project_id').references('projects.id').onDelete('CASCADE');
      table.timestamps(true, true);
    });
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("tasks")
    .then(() => knex.schema.dropTableIfExists("projects"));
};
