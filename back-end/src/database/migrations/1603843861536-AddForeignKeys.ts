import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class AddForeignKeys1603843861536 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'transactions',
            new TableForeignKey({
                columnNames: ['item_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'items',
                name: 'TransactionItem',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('transactions', 'TransactionItem');
    }
}
