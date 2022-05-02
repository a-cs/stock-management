import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddCategoriesForeignKey1651511246512 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'items',
            new TableColumn({
                name: 'category_id',
                type: 'int',
                isNullable: false,
            }),
        );
        await queryRunner.createForeignKey(
            'items',
            new TableForeignKey({
                columnNames: ['category_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'categories',
                name: 'ItemCategory',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('items', 'ItemCategory');
    }

}
