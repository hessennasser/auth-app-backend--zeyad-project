import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'CO Serial Number',
    example: 'CCPIT6202500065611',
  })
  @IsNotEmpty()
  @IsString()
  coSerialNo: string;

  @ApiProperty({
    description: 'CO Certificate Number',
    example: '25C620000412/03909',
  })
  @IsNotEmpty()
  @IsString()
  coCertificateNo: string;
}
