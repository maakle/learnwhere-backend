export class UnsignedVcDto {
  type: string;
  data: Record<string, unknown>;
  holderDid: string;
  expiresAt?: string;
}

export default UnsignedVcDto;
