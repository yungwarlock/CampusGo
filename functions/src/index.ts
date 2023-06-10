import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import {WalletRepository} from "./walletManager";

admin.initializeApp();

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript

interface CreateAccountRequest {
  name: string;
  phoneNumber: string;
}

export const createAccount = functions.https.onCall(async (data: CreateAccountRequest) => {
  const repo = new WalletRepository();

  try {
    const res = await repo.createWallet(data.name, data.phoneNumber);
    await repo.saveWallet(res.wallet);

    return {
      gaURL: res.token.gaURL,
      tokenData: res.token.tokenValue,
      walletId: res.wallet.getUserInfo().name,
    };
  } catch (e) {
    throw new functions.https.HttpsError("failed-precondition", String(e));
  }

});

interface FundWalletRequest {
  amount: number;
  walletId: string;
  verificationToken: string;
}
export const fundWallet = functions.https.onCall(async (data: FundWalletRequest) => {
  const repo = new WalletRepository();

  try {
    const wallet = await repo.getWalletByID(data.walletId);
    await wallet.fundWallet(data.amount, data.verificationToken);
    await repo.saveWallet(wallet);
  } catch (e) {
    throw new functions.https.HttpsError("failed-precondition", String(e));
  }

  functions.logger.info(`Adding ${data.amount} tokens into ${data.walletId} account`);
  functions.logger.info(`Verification was ${data.verificationToken}`);
});


interface PayForTripRequest {
  walletId: string;
  verificationToken: string;
}
export const payForTrip = functions.https.onCall(async (data: PayForTripRequest) => {
  const repo = new WalletRepository();

  try {
    const wallet = await repo.getWalletByID(data.walletId);
    await wallet.payForTrip(data.verificationToken);
    await repo.saveWallet(wallet);
  } catch (e) {
    throw new functions.https.HttpsError("failed-precondition", String(e));
  }

  functions.logger.info(`${data.walletId} is paying for trip with verificationToken ${data.verificationToken}`);
});

