import { ApiProperty } from "@nestjs/swagger"

export class ResponseUserDto {

    @ApiProperty({ example: 0 })
    id: number

    @ApiProperty({ example: 'padthai' })
    name: string

    @ApiProperty({ example: 'padthai@mail.com' })
    email: string

    @ApiProperty({ example: 'user' })
    role: string
}

export class ResponseLoginDto {

    @ApiProperty({ example: 'this token' })
    accessToken: string;
}

export class SwaggerError {
    @ApiProperty({ example: 'message' })
    message: string;
}

export class ResponseMessageDto {
    message: string;
}
