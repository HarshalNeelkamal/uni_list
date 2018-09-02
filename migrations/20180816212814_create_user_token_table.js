exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('user_token', function (table) {
      table.increments().primary();
      table.string('email', 50).notNullable().unique();
      table.string('token', 20).notNullable().unique();
      table.boolean('active', false);
      table.integer('user_id').notNullable().unique();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('user_token')
  ]);
};
