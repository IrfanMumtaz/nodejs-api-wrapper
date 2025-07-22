const { Migration, sutando } = require('sutando');

module.exports = class extends Migration {
  /**
    * Run the migrations.
    */
  async up(schema) {
    await schema.createTable('users', (table) => {
      table.increments('id');
      table.string('name');
      table.timestamps();
    });
  }

  /**
    * Reverse the migrations.
    */
  async down(schema) {
    await schema.dropTableIfExists('users');
  }
};