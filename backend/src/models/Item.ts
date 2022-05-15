import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import Transaction from './Transaction';
import Category from './Category';


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

    @ManyToOne(() => Category, category => category.item, { eager: true })
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @OneToMany(() => Transaction, transaction => transaction.item)
    transaction: Transaction;


    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Item;
