import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const transaction_prisma_connection = prisma.transactions;

@Injectable()
export class TransactionsService {
  async create(createTransactionDto: CreateTransactionDto) {
    return await transaction_prisma_connection.create({
      data: { ...createTransactionDto }
    })
  }

  async findAll(accountId?: string) {
    const transactionsByAccount = await transaction_prisma_connection.findMany({
      where: { accountId }
    })
    return transactionsByAccount;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
