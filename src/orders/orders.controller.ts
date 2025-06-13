import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SwaggerError } from 'src/base/base.dto';

@ApiTags('Order')
@UseGuards(JwtAuthGuard)
@Controller('orders')
@ApiBearerAuth()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @ApiOperation({ summary: 'create user order' })
  @ApiBody({
    type: CreateOrderDto,
    description: 'Request Body For Create User Order',
  })
  @ApiOkResponse({ description: 'Success', type: SwaggerError })
  @ApiBadRequestResponse({
    type: SwaggerError,
    description: 'Bad Request',
  })
  @ApiUnauthorizedResponse({
    type: SwaggerError,
    description: 'Unauthorize',
  })
  @ApiInternalServerErrorResponse({
    type: SwaggerError,
    description: 'InternalServer',
  })
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto, @Req() req) {
    return await this.ordersService.create(createOrderDto, req.user.id);
  }

  @Get()
  async findAll(@Req() req) {
    return await this.ordersService.findAll(req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.ordersService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
  //   return this.ordersService.update(+id, updateOrderDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ordersService.remove(+id);
  // }
}
