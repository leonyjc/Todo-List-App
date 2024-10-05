/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("tasks", function (table) {
      table.increments("id"); // Primary key
      table.string("taskname").notNullable();
      table.integer("priority").notNullable();
      table.date("due_date").notNullable();
      table.timestamps(true, true); // Adds created_at and updated_at columns
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("tasks");
  };
