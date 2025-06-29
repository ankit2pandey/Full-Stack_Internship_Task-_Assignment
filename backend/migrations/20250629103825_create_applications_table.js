exports.up = function (knex) {
  return knex.schema.createTable('applications', (table) => {
    table.increments('id').primary();
    table.integer('tender_id').unsigned().references('id').inTable('tenders').onDelete('CASCADE');
    table.integer('company_id').unsigned().references('id').inTable('companies').onDelete('CASCADE');
    table.text('proposal');
    table.timestamps(true, true);
    table.unique(['tender_id', 'company_id']); // One application per tender per company
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('applications');
};
