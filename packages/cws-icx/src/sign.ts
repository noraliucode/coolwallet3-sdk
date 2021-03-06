import { core } from '@coolwallets/core';
import * as icxUtil from './util';

type Transport = import('@coolwallets/transport').default;

/**
 * Sign ICON Transaction
 */
// eslint-disable-next-line import/prefer-default-export
export const signTransaction = async (
  transport: Transport,
  appId: string,
  appPrivateKey: string,
  coinType: string,
  rawTx: object | string,
  addressIndex: number,
  publicKey: string,
  confirmCB: Function | undefined = undefined,
  authorizedCB: Function | undefined = undefined
): Promise<Object> => {
  const keyId = core.util.addressIndexToKeyId(coinType, addressIndex);
  const phraseToSign = icxUtil.generateHashKey(rawTx);
  const rawPayload = Buffer.from(phraseToSign, 'utf-8');
  const dataForSE = core.flow.prepareSEData(keyId, rawPayload, coinType);
  const signature = await core.flow.sendDataToCoolWallet(
    transport,
    appId,
    appPrivateKey,
    dataForSE,
    '00',
    '00',
    false,
    undefined,
    confirmCB,
    authorizedCB,
    true
  );

  const txObject = await icxUtil.generateRawTx(signature, rawTx, publicKey);
  return txObject;
};
