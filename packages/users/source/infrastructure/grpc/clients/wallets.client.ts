import { credentials } from '@grpc/grpc-js';
import {
  type CreateWalletResponseMessage,
  WalletsServiceClient,
} from '@payap/wallets';

const walletsServiceClent = new WalletsServiceClient(
  'localhost:59874',
  credentials.createInsecure(),
);

export const createWallet = ({
  user,
}: {
  user: { uuid: string };
}) =>
  new Promise<CreateWalletResponseMessage>(
    (resolve, reject) => {
      walletsServiceClent.createWallet(
        {
          userUuid: user.uuid,
        },
        (error, response) => {
          if (error) {
            return reject(error);
          }

          resolve(response);
        },
      );
    },
  );
