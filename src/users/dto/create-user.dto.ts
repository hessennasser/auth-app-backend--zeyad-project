import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDate,
  IsEnum,
  IsNumber,
  IsArray,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../../common/enums/role.enum';
import { Transform, Type } from 'class-transformer';

// Create a DTO for the certificate data
export class CertificateDataDto {
  @ApiPropertyOptional({ description: 'Authorized by', example: '林佩怡' })
  @IsOptional()
  @IsString()
  authorizedBy?: string;

  @ApiPropertyOptional({ description: 'H.S. Code', example: '540769' })
  @IsOptional()
  @IsString()
  hsCode?: string;

  @ApiPropertyOptional({
    description: 'Issue Date',
    example: '2025-02-10T00:00:00Z',
  })
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  issueDate?: Date;

  @ApiPropertyOptional({ description: 'Weight', example: 100 })
  @IsOptional()
  @IsNumber()
  weight?: number;
}

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

  @ApiPropertyOptional({ description: 'Country', example: 'IRAQ' })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({ description: 'Sign', example: '940231E920C92DD7' })
  @IsOptional()
  @IsString()
  sign?: string;

  @ApiPropertyOptional({
    description: 'Certificate data array',
    type: [CertificateDataDto],
    example: [
      {
        authorizedBy: '林佩怡',
        hsCode: '540769',
        issueDate: '2025-02-10T00:00:00Z',
        weight: 100,
      },
    ],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CertificateDataDto)
  certificates?: CertificateDataDto[];

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

// Update DTO will be similar, but with all fields optional
export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Company name',
    example: 'GUANGZHOU ZHANZHIHANG TRADING CO.,LTD',
  })
  @IsOptional()
  @IsString()
  companyName?: string;

  @ApiPropertyOptional({
    description: 'Company address',
    example:
      'ROOM 320, NO. 1, JIANGXIA NORTH MIDDLE ROAD, BAIYUN DISTRICT, GUANGZHOU, CHINA',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    description: 'CO Serial Number',
    example: 'CCPIT6202500065611',
  })
  @IsOptional()
  @IsString()
  coSerialNo?: string;

  @ApiPropertyOptional({
    description: 'CO Certificate Number',
    example: '25C620000412/03909',
  })
  @IsOptional()
  @IsString()
  coCertificateNo?: string;

  @ApiPropertyOptional({
    description: 'Invoice Number',
    example: 'ANG250124-3',
  })
  @IsOptional()
  @IsString()
  invoiceNo?: string;

  @ApiPropertyOptional({ description: 'Country', example: 'IRAQ' })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({ description: 'Sign', example: '940231E920C92DD7' })
  @IsOptional()
  @IsString()
  sign?: string;

  @ApiPropertyOptional({
    description: 'Certificate data array',
    type: [CertificateDataDto],
    example: [
      {
        authorizedBy: '林佩怡',
        hsCode: '540769',
        issueDate: '2025-02-10T00:00:00Z',
        weight: 100,
      },
    ],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CertificateDataDto)
  certificates?: CertificateDataDto[];

  @ApiPropertyOptional({
    description: 'User role',
    enum: Role,
    default: Role.User,
    example: Role.User,
  })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
