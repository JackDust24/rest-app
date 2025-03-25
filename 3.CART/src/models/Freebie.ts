export class Freebie {
  constructor(
    public readonly requiredProductId: string,
    public readonly freebieProductId: string,
    public readonly quantity: number = 1
  ) {}
}
