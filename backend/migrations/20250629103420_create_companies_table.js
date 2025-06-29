exports.up = function (knex) {
  return knex.schema.createTable('companies', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    table.string('name').notNullable();
    table.string('industry');
    table.text('description');
    table.string('logo_url');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('companies');
};
