import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDate,
  IsEnum,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../../common/enums/role.enum';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({
    description: 'Company name',
    example: 'GUANGZHOU ZHANZHIHANG TRADING CO.,LTD',
  })
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @ApiProperty({
    description: 'Company address',
    example:
      'ROOM 320, NO. 1, JIANGXIA NORTH MIDDLE ROAD, BAIYUN DISTRICT, GUANGZHOU, CHINA',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

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

  @ApiPropertyOptional({
    description: 'Invoice Number',
    example: 'ANG250124-3',
  })
  @IsOptional()
  @IsString()
  invoiceNo?: string;

  @ApiPropertyOptional({ description: 'Authorized by', example: '林佩怡' })
  @IsOptional()
  @IsString()
  authorizedBy?: string;

  @ApiPropertyOptional({ description: 'Country', example: 'IRAQ' })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({ description: 'H.S. Code', example: '540769' })
  @IsOptional()
  @IsString()
  hsCode?: string;
  @ApiPropertyOptional({ description: 'Issue Date', example: '2025-02-10T00:00:00Z' })
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  issueDate?: Date;

  @ApiPropertyOptional({ description: 'Sign', example: '940231E920C92DD7' })
  @IsOptional()
  @IsString()
  sign?: string;

  @ApiPropertyOptional({ description: 'Weight', example: 100 })
  @IsOptional()
  @IsString()
  weight?: number;

  @ApiPropertyOptional({
    description: 'User role',
    enum: Role,
    default: Role.User,
    example: Role.User,
  })
  @IsEnum(Role)
  @IsOptional()
  role?: Role = Role.User;
}
