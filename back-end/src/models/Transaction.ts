import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import Item from './Item';

@Entity('transactions')
class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    item_id: number;

    @ManyToOne(() => Item, item => item.transaction)
    item: Item;

    @Column()
    item_name: string;

    @Column('int')
    item_quantity: number;

    @Column()
    type: 'in' | 'out';

    @Column('int')
    user_id: number;

    @Column()
    user_name: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Transaction;
