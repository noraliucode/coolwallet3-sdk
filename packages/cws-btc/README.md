# CoolWalletS Bitcoin (LTC) App

![version](https://img.shields.io/npm/v/@coolwallets/btc)

## Install

```shell
npm i @coolwallets/btc
```

## Usage

```javascript
import BTC from '@coolwallets/btc'
import WebBleTransport from "@coolwallets/transport-web-ble";

...skip

WebBleTransport.listen(async (error, device) => {
  console.log(device)
  if (device) {
    const cardName = device.name;
    const transport = await WebBleTransport.connect(device);
    this.setState({ transport, cardName });
  } else {
    console.log(error);
  }
});

const btc = new BTC(transport, appPrivateKey, appId);
```

### Get Address

Get address by address index.

```javascript
const ScriptType = btc.ScriptType.P2SH_P2WPKH;

const { address, outScript } = await btc.getAddressAndOutScript(ScriptType, 0);
```

### Sign Transaction

Sign transaction by input address type, UTXOs, output address and change address index.

```javascript
const ScriptType = btc.ScriptType.P2SH_P2WPKH;

const transaction = await btc.signTransaction(ScriptType, inputs, output, change);
```

Types for signTransaction

```javascript
export enum ScriptType {
	P2PKH = 'P2PKH',
	P2SH_P2WPKH = 'P2SH_P2WPKH',
	P2WPKH = 'P2WPKH',
}

export type Input = {
  preTxHash: string,
  preIndex: number,
  preValue: string,
  sequence?: number,
  addressIndex: number,
	pubkeyBuf?: Buffer,
};

export type Output = {
  value: string,
  address: string,
};

export type Change = {
  value: string,
  addressIndex: number,
	pubkeyBuf?: Buffer,
};
```
