/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("tasks").del();
  await knex("tasks").insert([
    { taskname: "Task 1", priority: 3, due_date: "2024-08-19" },
    { taskname: "Task 2", priority: 5, due_date: "2024-08-27" },
    { taskname: "Task 3", priority: 2, due_date: "2024-08-25" },
    { taskname: "Math Homework", priority: 5, due_date:"2024-08-15"}
  ]);
};
