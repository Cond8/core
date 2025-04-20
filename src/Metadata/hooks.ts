// src/Metadata/hooks.ts
import { CoreConduit } from '../CoreDomain/index.js';

export abstract class MetaHook {
  protected constructor(readonly kind: string) {}
}

export class ActorTestInput<C8 extends CoreConduit> extends MetaHook {
  constructor(readonly inputC8: C8) {
    super('ActorTestInput');
  }
}

export class ActorTestOutput<C8 extends CoreConduit> extends MetaHook {
  constructor(readonly outputC8: (c8: C8) => void) {
    super('ActorTestOutput');
  }
}

export class DirectorTestInput<In extends object> extends MetaHook {
  constructor(readonly input: In) {
    super('DirectorTestInput');
  }
}

export class DirectorTestOutput<Out> extends MetaHook {
  constructor(readonly output: (val: Out) => void) {
    super('DirectorTestOutput');
  }
}

export const CoreMetaHooks = {
  Actor: {
    TestInput: <T extends CoreConduit>(input: T) => new ActorTestInput(input),
    TestOutput: <T extends CoreConduit>(output: (c8: T) => void) =>
      new ActorTestOutput(output),
  },
  Director: {
    TestInput: <T extends Record<string, unknown>>(input: T) =>
      new DirectorTestInput(input),
    TestOutput: <T>(output: (val: T) => void) => new DirectorTestOutput(output),
  },
};
