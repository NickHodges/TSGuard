class EGuardError extends Error {}
class EArgumentError extends EGuardError {}
class EArgumentIsNullOrUndefinedError extends EGuardError {}

export class Guard {
  // Private Methods
  private static isDefined<T>(value: T | undefined | null): value is T {
    return <T>value !== undefined && <T>value !== null;
  }

  private static raiseArgumentError(aMessage: string) {
    throw new EArgumentError(aMessage);
  }

  private static raiseArgumentIsNullOrUndefinedError(aMessage: string) {
    throw new EArgumentIsNullOrUndefinedError(aMessage);
  }

  // Public Methods (all of them should be static)
  public static checkTrue(aCondition: Boolean, aMessage: string) {
    if (!aCondition) {
      Guard.raiseArgumentError(aMessage);
    }
  }

  public static checkFalse(aCondition: Boolean, aMessage: string) {
    if (aCondition) {
      Guard.raiseArgumentError(aMessage);
    }
  }

  public static checkNotNullorUndefined(aArgument: any, aMessage: string) {
    if (!Guard.isDefined(aArgument)) {
      Guard.raiseArgumentIsNullOrUndefinedError(aMessage);
    }
  }
}

//Guard.checkTrue(false, 'This shit is working');
//Guard.checkFalse(true, 'So does this shit');
//Guard.checkNotNullorUndefined(null, 'Yep, it is null, nothing, nada.');
