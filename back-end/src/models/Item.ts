import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';

import Transaction from './Transaction';

@Entity('items')
class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('decimal',{ precision: 6, scale: 3 })
    minimal_stock_alarm: number;

    @Column('decimal',{ precision: 6, scale: 3 })
    total_stock: number;

    @OneToMany(() => Transaction, transaction => transaction.item)
    transaction: Transaction;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Item;
