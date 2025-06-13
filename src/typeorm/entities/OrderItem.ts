import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./Order";

@Entity({
    name: 'order_items'
})
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    product_name: string;

    @Column()
    price: number;

    @Column()
    qty: number;

    @ManyToOne(() => Order, order => order.orderItems)
    order: Order;
    
    @Column({ default: new Date() })
    createdAt: Date;
}