import * as CryptoJS from 'crypto-js';
import { Injectable } from '@angular/core';
declare const Buffer;

@Injectable({ providedIn: 'root' })
export class FnSignerService {

  private debug: boolean;

  constructor() {
    this.debug = false;
  }

  public showDebug(): void {
    this.debug = true;
  }

  public sign(
    accessKeyId: string,
    secretAccessKey: string,
    url: string,
    content: any,
    httpMethod: string,
    date: Date,
    contentType: string
  ): string {
    let rawString = httpMethod.toUpperCase() + '\n';

    // Content component (if exists): Convert to JSON if necessary
    let contentMd5 = null;
    if (content) {
      if (typeof content === 'string') {
        contentMd5 = new CryptoJS.MD5(content);
      } else {
        if (content instanceof ArrayBuffer) {
          contentMd5 = new CryptoJS.MD5(CryptoJS.enc.Hex.parse(new Buffer(content).toString('hex')));
        } else if (typeof content === 'object') {
          const json = JSON.stringify(content);
          contentMd5 = new CryptoJS.MD5(json);
        }
      }
    }

    if (contentMd5 !== null) {
      rawString += contentMd5 + '\n';
      rawString += contentType + '\n';
    } else {
      rawString += '\n\n';
    }

    rawString += date.toISOString().split('.')[0] + 'Z' + '\n';

    const urlBits = url.split('?');
    const urlWithoutQueryParams = urlBits[0];
    rawString += urlWithoutQueryParams;

    if (!secretAccessKey) {
      throw new Error('FnSigner: You must specify a secretAccessKey');
    }

    const hash = new CryptoJS.HmacSHA256(rawString, secretAccessKey);
    const digestCreated = CryptoJS.enc.Base64.stringify(hash);
    const signature = 'FNAUTH ' + accessKeyId + ':' + digestCreated;

    if (this.debug) {
      // keep the log lines below for debugging API signing
      console.log('RAWSTRING:');
      console.log(rawString);
      console.log('SAC:' + secretAccessKey);
      console.log('ContentMd5:' + contentMd5);
      console.log('b64hash:' + digestCreated);
      console.log('Sig:' + signature);
    }

    return signature;
  }
}
