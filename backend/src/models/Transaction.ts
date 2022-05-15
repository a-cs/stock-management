import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
} from 'typeorm';
import Item from './Item';

@Entity('transactions')
class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Item, item => item.transaction, { eager: true })
    @JoinColumn({ name: 'item_id' })
    item: Item;

    @Column('decimal',{ precision: 6, scale: 3 })
    item_quantity: number;

    @Column()
    type: 'in' | 'out';

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Transaction;
