import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { Order } from "src/typeorm/entities/Order";

export class OrderItemDto {
    @IsNumber()
    @ApiProperty()
    id: number;

    @IsString()
    @ApiProperty()
    product_name: string;

    @IsNumber()
    @ApiProperty()
    qty: number;

    @IsNumber()
    @ApiProperty()
    price: number;

    @IsNumber()
    @ApiProperty()
    orderId: number;
}