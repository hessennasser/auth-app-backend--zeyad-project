import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../common/enums/role.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  companyName: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true, unique: true })
  coSerialNo: string;

  @Prop({ required: true, unique: true })
  coCertificateNo: string;

  @Prop()
  invoiceNo: string;

  @Prop()
  authorizedBy: string;

  @Prop()
  country: string;

  @Prop()
  hsCode: string;

  @Prop()
  issueDate: Date;

  @Prop()
  sign: string;

  @Prop({ enum: Role, default: Role.User })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
