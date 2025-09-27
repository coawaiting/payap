import * as path from 'node:path';
import { Server } from '@grpc/grpc-js';
import { load } from '@grpc/proto-loader';
import { ReflectionService } from '@grpc/reflection';
import { TransactionTypeEnum } from '@payap/transactions/core/enums/transactionType.enum.ts';
import type { AbstractTransactionsService } from '@payap/transactions/core/services/transactions.service.ts';
import type { CreateTransactionRequestMessage } from '@payap/transactions/generated/v1/messages/createTransactionRequest.message.ts';
import type { CreateTransactionResponseMessage } from '@payap/transactions/generated/v1/messages/createTransactionResponse.message.ts';
import {
  type TransactionsServiceServer,
  TransactionsServiceService,
} from '@payap/transactions/generated/v1/services/transactions.service.ts';
import { BigNumber } from 'bignumber.js';

export const createTransactionsServer = async ({
  transactionsService,
}: {
  transactionsService: AbstractTransactionsService;
}) => {
  const implementation: TransactionsServiceServer = {
    createTransaction: async (call, callback) => {
      try {
        const input: CreateTransactionRequestMessage = call.request;

        const transaction = await transactionsService.createTransaction({
          amount: BigNumber(input.amount),
          transactionType: TransactionTypeEnum.Payout,
        });

        const output: CreateTransactionResponseMessage = {
          transactionUuid: transaction.uuid,
        };

        callback(null, output);
      } catch (error) {
        callback(error as Error, null as unknown);
      }
    },
  };

  const server = new Server();

  server.addService(TransactionsServiceService, implementation);

  const packageDefinition = await load(
    path.resolve(
      import.meta.dirname,
      '../proto/v1/services/transactions.service.proto',
    ),
    {
      includeDirs: [path.resolve(import.meta.dirname, '../proto/')],
    },
  );

  const reflection = new ReflectionService(packageDefinition);

  reflection.addToServer(server);

  return server;
};
