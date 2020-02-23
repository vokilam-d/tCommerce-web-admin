import { ReadableCurrencyPipe } from './readable-currency.pipe';

describe('ReadableCurrencyPipe', () => {
  it('create an instance', () => {
    const pipe = new ReadableCurrencyPipe();
    expect(pipe).toBeTruthy();
  });
});
