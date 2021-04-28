import { Injectable } from '@nestjs/common';
import { CreateIssuerDto } from './dto/create-issuer.dto';
import { UpdateIssuerDto } from './dto/update-issuer.dto';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { ClientSecretCredential } from '@azure/identity';
import {
  CryptoBuilder,
  LongFormDid,
  RequestorBuilder,
  KeyReference,
  KeyUse,
  IRequestor,
} from 'verifiablecredentials-verification-sdk-typescript';

@Injectable()
export class IssuerService {
  constructor(
    private configService: ConfigService,
    private kvCredentials: ClientSecretCredential,
    private signingKeyReference: KeyReference,
  ) {}

  onModuleInit() {
    this.kvCredentials = new ClientSecretCredential(
      this.configService.get<string>('azTenantId'),
      this.configService.get<string>('azClientId'),
      this.configService.get<string>('azClientSecret'),
    );

    this.signingKeyReference = new KeyReference(
      this.configService.get<string>('kvSigningKeyId'),
      'key',
      this.configService.get<string>('kvRemoteSigningKeyId'),
    );
  }

  async createIssueRequest(req: Request) {
    const crypto = new CryptoBuilder()
      .useSigningKeyReference(this.signingKeyReference)
      .useKeyVault(
        this.kvCredentials,
        this.configService.get<string>('kvVaultUri'),
      )
      .useDid(this.configService.get<string>('did'))
      .build();

    const requestBuilder = new RequestorBuilder(
      {
        presentationDefinition: {
          input_descriptors: [
            {
              id: 'expert',
              schema: {
                uri: this.configService.get<string>('credentialType'),
              },
              issuance: [
                {
                  manifest: this.configService.get<string>('credential'),
                },
              ],
            },
          ],
        },
      } as any,
      crypto,
    ).allowIssuance();
    console.log('AAAA ', crypto);

    // Save issueRequest in data storage db
    const issueRequest = await requestBuilder.build().create();
    console.log('biatch ', issueRequest);

    const id = '122345';
    // TODO save to db

    // Return a reference to the issue request that can be encoded as a QR code
    const requestUri = encodeURIComponent(
      `https://${req.hostname}/issue-request.jwt?id=${id}`,
    );
    const issueRequestReference = 'openid://vc/?request_uri=' + requestUri;

    return issueRequestReference;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} issuer`;
  // }

  // update(id: number, updateIssuerDto: UpdateIssuerDto) {
  //   return `This action updates a #${id} issuer`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} issuer`;
  // }
}
