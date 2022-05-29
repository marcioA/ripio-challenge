import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { AccountService } from '../account/account.service';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private accountService: AccountService
  ) { }

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    const { value, type, accountId } = createTransactionDto;
    if (!accountId) throw new BadRequestException('Conta inválida')
    if (type !== "deposit" && type !== "withdraw") throw new BadRequestException('Tipo de transação inválida');

    if (type === "deposit") {
      const { balance_value } = await this.accountService.findOne(accountId);
      await this.accountService.update(accountId, { balance_value: balance_value + value });
    }

    if (type === "withdraw") {
      const { credit_value, balance_value } = await this.accountService.findOne(accountId);
      if ((credit_value + balance_value) - value <= 0) return new UnauthorizedException('Você não possui valor disponivel para esse saque')
      await this.accountService.update(accountId, { balance_value: balance_value - value });
    }

    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  @Get(':accountId/statement')
  findByAccount(@Param('accountId') accountId: string) {
    return this.transactionsService.findAll(accountId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
