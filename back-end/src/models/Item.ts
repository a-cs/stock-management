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

    @Column('int')
    minimal_stock_alarm: number;

    @Column('int')
    total_stock: number;

    @OneToMany(() => Transaction, transaction => transaction.item)
    transaction: Transaction;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Item;
