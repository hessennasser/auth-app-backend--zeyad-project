import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if user with these certificates already exists
    const existingUser = await this.userModel.findOne({
      $or: [
        { coSerialNo: createUserDto.coSerialNo },
        { coCertificateNo: createUserDto.coCertificateNo },
      ],
    });

    if (existingUser) {
      throw new ConflictException(
        'User with these certificates already exists',
      );
    }

    const newUser = new this.userModel({
      ...createUserDto,
    });

    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByCertificates(
    coSerialNo: string,
    coCertificateNo: string,
  ): Promise<UserDocument> {
    return this.userModel
      .findOne({
        coSerialNo,
        coCertificateNo,
      })
      .exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return updatedUser;
  }

  // Add a method to add certificate data to a user
  async addCertificate(id: string, certificateData: any): Promise<User> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    user.certificates.push(certificateData);
    return user.save();
  }

  // Add a method to remove certificate data from a user
  async removeCertificate(id: string, certificateId: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    user.certificates = user.certificates.filter(
      (cert) => cert._id.toString() !== certificateId,
    );

    return user.save();
  }

  async remove(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();

    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return deletedUser;
  }
}
