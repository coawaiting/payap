import * as path from 'node:path';
import { Server, ServerCredentials } from '@grpc/grpc-js';
import { load } from '@grpc/proto-loader';
import { ReflectionService } from '@grpc/reflection';
import { TransactionTypeEnum } from '@payap/transactions/core/enums/transactionType.enum.ts';
import type { AbstractTransactionsService } from '@payap/transactions/core/services/transactions.service.ts';
import type { CreateTransactionResponseMessage } from '@payap/transactions/generated/v1/messages/createTransactionResponse.message.ts';
import {
  type TransactionsServiceServer,
  TransactionsServiceService,
} from '@payap/transactions/generated/v1/services/transactions.service.ts';
import { BigNumber } from 'bignumber.js';

export class TransactionsServer {
  private readonly server: Server;
  private readonly transactionsService: AbstractTransactionsService;

  public constructor({
    transactionsService,
  }: {
    transactionsService: AbstractTransactionsService;
  }) {
    this.server = new Server();
    this.transactionsService = transactionsService;
  }

  public async addReflection() {
    const packageDefinition = await load(
      path.resolve(
        import.meta.dirname,
        '../proto/v1/services/transactions.service.proto',
      ),
      {
        includeDirs: [
          path.resolve(import.meta.dirname, '../proto/'),
        ],
      },
    );

    const reflection = new ReflectionService(packageDefinition);

    reflection.addToServer(this.server);
  }

  public async addServices() {
    const implementation: TransactionsServiceServer = {
      createTransaction: async (call, callback) => {
        try {
          const input = call.request;

          const transaction =
            await this.transactionsService.createTransaction({
              amount: BigNumber(input.amount),
              transactionType: TransactionTypeEnum.Payout,
            });

          const output: CreateTransactionResponseMessage = {
            transactionUuid: transaction.uuid,
          };

          callback(null, output);
        } catch (error) {
          callback(error as Error, null);
        }
      },
    };

    this.server.addService(
      TransactionsServiceService,
      implementation,
    );
  }

  public async initialize() {
    await this.addReflection();
    await this.addServices();
  }

  public run() {
    return new Promise<void>((resolve, reject) => {
      this.server.bindAsync(
        '0.0.0.0:59876',
        ServerCredentials.createInsecure(),
        (error) => {
          if (error) {
            reject(error);

            return;
          }

          resolve();
        },
      );
    });
  }
}
