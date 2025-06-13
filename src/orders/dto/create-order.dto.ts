import { ApiProperty } from "@nestjs/swagger"

export class CreateOrderItemDto {

    @ApiProperty()
    productName: string

    @ApiProperty()
    quantity: number

    @ApiProperty()
    price: number
}

export class CreateOrderDto {

    @ApiProperty({ type: [CreateOrderItemDto], })
    orderItems: CreateOrderItemDto[]

}
