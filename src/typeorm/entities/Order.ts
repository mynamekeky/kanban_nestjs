import { OrderItemDto } from "src/orders/dto/orderItem.dto";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./OrderItem";
import { User } from "./User";

@Entity({
    name: 'orders'
})
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 'pending' })
    status: string;

    @OneToMany(() => OrderItem, orderItem => orderItem.order, {
        cascade: true,
        eager: true
    })
    orderItems: OrderItem[];

    @ManyToOne(() => User, user => user.orders)
    user: User;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
