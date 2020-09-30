import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export default class AddUserIdToAppointments1601491684821 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('appointments', new TableColumn({
      name: 'customer_id',
      type: 'uuid',
      isNullable: true
    }))

    await queryRunner.createForeignKey('appointments', new TableForeignKey({
      name: 'appointment_customer',
      columnNames: ['customer_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'appointment_customer')
    await queryRunner.dropColumn('appointments', 'customer_id')
  }
}
