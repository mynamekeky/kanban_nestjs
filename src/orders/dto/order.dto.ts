import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, ValidateNested } from "class-validator";
import { OrderItemDto } from "./orderItem.dto";

export class OrderDto {
    @IsNumber()
    @ApiProperty()
    id: number;

    @ApiProperty()
    @IsString()
    status: string;

    @IsNumber()
    @ApiProperty()
    userId: number;

    @ApiProperty({ type: [OrderItemDto] })
    orderItems: OrderItemDto[];

}