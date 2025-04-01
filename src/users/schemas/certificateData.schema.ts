import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';

export type UserDocument = User & Document;

@Schema()
export class CertificateData {
  @Prop({ type: MongooseSchema.Types.ObjectId })
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId: User | MongooseSchema.Types.ObjectId;

  @Prop()
  authorizedBy: string;

  @Prop()
  hsCode: string;

  @Prop()
  issueDate: Date;

  @Prop()
  weight: string;
}

export const CertificateDataSchema =
  SchemaFactory.createForClass(CertificateData);
