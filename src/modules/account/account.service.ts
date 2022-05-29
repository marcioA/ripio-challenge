import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const account_prisma_connection = prisma.account;

@Injectable()
export class AccountService {

  async create(createAccountDto: CreateAccountDto) {

    const createdUser = await account_prisma_connection.create({
      data: {
        ...createAccountDto
      }
    })
    return createdUser;
  }

  async findAll() {
    return await account_prisma_connection.findMany();
  }

  async findOne(id: string) {
    return await account_prisma_connection.findFirst({ where: { id } });
  }

  update(id: string, updateAccountDto: UpdateAccountDto) {
    return account_prisma_connection.update({
      where: { id },
      data: { ...updateAccountDto }
    })
  }

  remove(id: string) {
    return `This action removes a #${id} account`;
  }
}
