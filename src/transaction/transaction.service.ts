import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionService {
  constructor(@InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>) {}
  async createTransaction(transaction: Transaction) {
    return await this.transactionRepository.save(transaction);
  }

  async findTransactionById(transactionId: string): Promise<Transaction> {
    return await this.transactionRepository.findOne({ where: { id: transactionId } });
  }

  async updateTransactionById(transactionId: string, data: Record<any, any> = {}): Promise<Transaction> {
    const updated = await this.transactionRepository
      .createQueryBuilder()
      .update()
      .set(data)
      .where('id = :transactionId', { transactionId })
      .execute();
    if (!updated.affected) {
      throw new BadRequestException('Cant not update transaction');
    }
    return this.transactionRepository.findOne({ where: { id: transactionId } });
  }
}
