import {Totp} from "time2fa";
import {customAlphabet} from "nanoid";
import * as admin from "firebase-admin";

const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nanoid = customAlphabet(alphabet, 13);


class Wallet {
  constructor(
    private balance: number,
    private readonly name: string,
    private readonly phoneNumber: string,
    private readonly securityTokenId: string,
    private readonly tokenManager: SecurityTokenManager,
  ) {}

  public async fundWallet(amount: number, securityToken: string): Promise<void> {
    // Verify the securityToken
    await this.tokenManager.verifyToken(this.securityTokenId, securityToken);
    this.balance = this.balance + amount;
  }

  public getUserInfo() {
    return {
      name: this.name,
      balance: this.balance,
      phoneNumber: this.phoneNumber,
      securityTokenId: this.securityTokenId,
    };
  }

  public async payForTrip(securityToken: string): Promise<void> {
    // Verify the securityToken
    await this.tokenManager.verifyToken(this.securityTokenId, securityToken);

    this.balance = this.balance - 1;
  }
}

class SecurityTokenManager {
  private readonly orgId = "Campusgo.ng";
  private readonly collectionId = "verificationToken";
  private readonly db: admin.firestore.CollectionReference;

  constructor() {
    this.db = admin.firestore().collection(this.collectionId);
  }

  public async createTokenForUser(userId: string): Promise<Token> {
    const totp = Totp.generateKey({issuer: this.orgId, user: userId});
    const data = {
      tokenId: nanoid(),
      tokenValue: totp.secret,
    };

    // Save to database
    const doc = this.db.doc();
    await doc.set(data);
    return {...data, gaURL: totp.url};
  }

  public async verifyToken(tokenId: string, tokenValue: string) {
    const res = await this.db.where("tokenId", "==", tokenId).get();
    if (res.docs.length == 0) {
      throw new Error("TokenId does not exist");
    }

    const token = res.docs[0].data() as Token;

    if (!this.verifyTotp(token.tokenValue, tokenValue)) {
      throw new Error("Verification failed");
    }
  }

  private verifyTotp(secret: string, passcode: string): boolean {
    return Totp.validate({secret, passcode});
  }
}

interface Token {
  gaURL: string;
  tokenId: string;
  tokenValue: string;
}

export class WalletRepository {
  private readonly collectionId = "wallets";
  private readonly db: admin.firestore.CollectionReference;

  constructor() {
    this.db = admin.firestore().collection(this.collectionId);
  }

  public async createWallet(name: string, phoneNumber: string): Promise<{wallet: Wallet, token: Token}> {
    const tokenManager = new SecurityTokenManager();
    const token = await tokenManager.createTokenForUser(name);

    const wallet = new Wallet(0, name, phoneNumber, token.tokenId, tokenManager);

    return {
      token,
      wallet,
    };
  }

  public async saveWallet(wallet: Wallet): Promise<void> {
    const doc = this.db.doc(wallet.getUserInfo().name);

    await doc.set({
      name: wallet.getUserInfo().name,
      balance: wallet.getUserInfo().balance,
      phoneNumber: wallet.getUserInfo().phoneNumber,
      securityTokenId: wallet.getUserInfo().securityTokenId,
    }, {merge: true});
  }

  public async getWalletByID(walletId: string): Promise<Wallet> {
    const doc = await this.db.doc(walletId).get();
    const data = doc.data();

    if (!doc.exists || !data) {
      throw new Error("Wallet does not exist");
    }

    return new Wallet(
      data.balance,
      data.name,
      data.phoneNumber,
      data.securityTokenId,
      new SecurityTokenManager(),
    );
  }
}
