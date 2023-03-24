class InvalidCardNumber extends Error {
  public static UNSUPPORTED_TYPE: string = "Please provide a valid card number";

  public constructor(public code: number, message?: string) {
    super(message);
  }
}

export default InvalidCardNumber;
