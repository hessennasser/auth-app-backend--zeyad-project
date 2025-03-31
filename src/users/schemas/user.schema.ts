import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../common/enums/role.enum';
import {
  CertificateData,
  CertificateDataSchema,
} from './certificateData.schema';

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
  country: string;

  @Prop()
  sign: string;

  // Replace the individual fields with an array of certificate data objects
  @Prop({ type: [CertificateDataSchema], default: [] })
  certificates: CertificateData[];

  @Prop({ enum: Role, default: Role.User })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
