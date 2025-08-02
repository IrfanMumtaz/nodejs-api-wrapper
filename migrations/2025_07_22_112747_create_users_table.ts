import { Migration, Schema } from 'sutando';

export default class CreateUsersTable extends Migration {
  /**
   * Run the migrations.
   */
  async up(schema: Schema): Promise<void> {
    await schema.createTable('users', table => {
      table.increments('id');
      table.string('name');
      table.timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  async down(schema: Schema): Promise<void> {
    await schema.dropTableIfExists('users');
  }
}
