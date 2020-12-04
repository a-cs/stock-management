import {
    MigrationInterface,
    QueryRunner,
    TableForeignKey,
    TableColumn,
} from 'typeorm';

export default class AddForeignKeys1603843861536 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'transactions',
            new TableColumn({
                name: 'item_id',
                type: 'int',
                isNullable: false,
            }),
        );
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
