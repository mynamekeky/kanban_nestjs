import { ApiProperty } from "@nestjs/swagger";

export class SwaggerError {
    @ApiProperty({ example: 'message' })
    message: string;
}

export class ResponseMessageDto {
    message: string;
}
