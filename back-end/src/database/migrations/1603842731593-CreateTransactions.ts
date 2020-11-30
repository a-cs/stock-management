import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateTransactions1603842731593
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'transactions',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'item_id',
                        type: 'int',
                    },
                    {
                        name: 'item_name',
                        type: 'varchar',
                    },
                    {
                        name: 'item_quantity',
                        type: 'int',
                    },
                    {
                        name: 'type',
                        type: 'varchar',
                    },
                    {
                        name: 'user_id',
                        type: 'int',
                    },
                    {
                        name: 'user_name',
                        type: 'varchar',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('transactions');
    }
}
