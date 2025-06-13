import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/typeorm/entities/Order';
import { Repository } from 'typeorm';
import { OrderItem } from 'src/typeorm/entities/OrderItem';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>
  ) {
  }

  async create(createOrderDto: CreateOrderDto, userId: number) {
    try {
      const orderItems = createOrderDto.orderItems.map((item) => {
        const orderItem = new OrderItem();
        orderItem.product_name = item.productName;
        orderItem.qty = item.quantity;
        orderItem.price = item.price * item.quantity;
        return orderItem;
      });

      const order = new Order();
      order.user = { id: userId } as any;
      order.orderItems = orderItems;
      
      await this.orderRepository.save(order);

      return {
        message: 'Create Success'
      };
    } catch (err) {
      console.error('Order creation error:', err);
      throw new InternalServerErrorException('Failed to create order');
    }
  }

  async findAll(userId: number) {
    return await this.orderRepository.find({
      where: { user: { id: userId } },
      relations: ['orderItems'],
    });
  }

  async findOne(id: number) {
    return await await this.orderRepository.findOne({
      where: { id },
      relations: ['orderItems'],
    });
  }

  // update(id: number, updateOrderDto: UpdateOrderDto) {
  //   return `This action updates a #${id} order`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
}
