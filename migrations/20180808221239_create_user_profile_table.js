
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function (table) {
      table.increments().primary();
      table.string('name_first', 30);
      table.string('name_last', 30);
      table.string('user_name', 15).notNullable().unique();
      table.string('email', 20).notNullable().unique();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ]);
};
