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

    try {
      const issueRequest = await requestBuilder.build().create();
      console.log('AAAA ', issueRequest);
      // Save issueRequest in data storage db
    } catch (error) {
      console.log(error);
    }

    const id = '122345';
    // ID from DB

    // Return a reference to the issue request that can be encoded as a QR code
    const requestUri = encodeURIComponent(
      `https://${req.hostname}/issue-request.jwt?id=${id}`,
    );
    const issueRequestReference = 'openid://vc/?request_uri=' + requestUri;

    return issueRequestReference;
  }
}
