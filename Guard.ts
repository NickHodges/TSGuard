class EGuardError extends Error {
  constructor(m: string) {
    super(m);
    Object.setPrototypeOf(this, EGuardError.prototype);
  }
}

class EArgumentError extends EGuardError {
  constructor(m: string) {
    super(m);
    Object.setPrototypeOf(this, EArgumentError.prototype);
  }
}

class EArgumentIsNullOrUndefinedError extends EGuardError {
  constructor(m: string) {
    super(m);
    Object.setPrototypeOf(this, EArgumentIsNullOrUndefinedError.prototype);
  }
}

class ENumberIsOutOfRange extends EGuardError {
  constructor(m: string) {
    super(m);
    Object.setPrototypeOf(this, ENumberIsOutOfRange.prototype);
  }
}

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

  private static raiseNumberIsOutOfRangeError(aMessage: string) {
    throw new ENumberIsOutOfRange(aMessage);
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

  public static againstNullorUndefined<T>(aArgument: T, aMessage: string) {
    if (!Guard.isDefined(aArgument)) {
      Guard.raiseArgumentIsNullOrUndefinedError(aMessage);
    }
  }

  public static thatNumbersAreInRangeInclusive(value: number, min: number, max: number, aMessage: string) {
    if ((value < min) && (value > max)) {
      Guard.raiseNumberIsOutOfRangeError(aMessage);
    }
  }

  public static thatNumbersAreInRangeExclusive(value: number, min: number, max: number, aMessage: string) {
    if ((value <= min) && (value >= max)) {
      Guard.raiseNumberIsOutOfRangeError(aMessage);
    }
  }

}
