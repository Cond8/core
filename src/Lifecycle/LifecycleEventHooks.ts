// src/Lifecycle/LifecycleEventHooks.ts
import { CoreConduit } from '../CoreDomain/index.js';
import { Recorder } from '../Recorder/create-recorder.js';
import { CouldPromise } from '../utils/fn-promise-like.js';
import { LifecyclePayload } from './Vacuum.js';

export abstract class FullLifecycleBlueprint<
  C8 extends CoreConduit = CoreConduit,
> {
  onActorAssertFail?(
    payload: LifecyclePayload<C8>,
    recorder?: Recorder,
  ): CouldPromise<void> {
    recorder?.('onActorAssertFail', payload);
  }
  onActorAssertStart?(
    payload: LifecyclePayload<C8>,
    recorder?: Recorder,
  ): CouldPromise<void> {
    recorder?.('onActorAssertStart', payload);
  }
  onActorAssertSuccess?(
    payload: LifecyclePayload<C8>,
    recorder?: Recorder,
  ): CouldPromise<void> {
    recorder?.('onActorAssertSuccess', payload);
  }
  onActorEnter?(
    payload: LifecyclePayload<C8>,
    recorder?: Recorder,
  ): CouldPromise<void> {
    recorder?.('onActorEnter', payload);
  }
  onActorError?(
    payload: LifecyclePayload<C8>,
    recorder?: Recorder,
  ): CouldPromise<void> {
    recorder?.('onActorError', payload);
  }
  onActorExit?(
    payload: LifecyclePayload<C8>,
    recorder?: Recorder,
  ): CouldPromise<void> {
    recorder?.('onActorExit', payload);
  }
  onDirectorAssertFail?(
    payload: LifecyclePayload<C8>,
    recorder?: Recorder,
  ): CouldPromise<void> {
    recorder?.('onDirectorAssertFail', payload);
  }
  onDirectorAssertStart?(
    payload: LifecyclePayload<C8>,
    recorder?: Recorder,
  ): CouldPromise<void> {
    recorder?.('onDirectorAssertStart', payload);
  }
  onDirectorAssertSuccess?(
    payload: LifecyclePayload<C8>,
    recorder?: Recorder,
  ): CouldPromise<void> {
    recorder?.('onDirectorAssertSuccess', payload);
  }
  onDirectorEnter?(
    payload: LifecyclePayload<C8>,
    recorder?: Recorder,
  ): CouldPromise<void> {
    recorder?.('onDirectorEnter', payload);
  }
  onDirectorExit?(
    payload: LifecyclePayload<C8>,
    recorder?: Recorder,
  ): CouldPromise<void> {
    recorder?.('onDirectorExit', payload);
  }
  onEnter?(
    payload: LifecyclePayload<C8>,
    recorder?: Recorder,
  ): CouldPromise<void> {
    recorder?.('onEnter', payload);
  }
  onExit?(
    payload: LifecyclePayload<C8>,
    recorder?: Recorder,
  ): CouldPromise<void> {
    recorder?.('onExit', payload);
  }
}

export interface OnEnterHook<C8 extends CoreConduit = CoreConduit> {
  onEnter(
    payload: LifecyclePayload<C8>,
    recorder?: Recorder,
  ): CouldPromise<void>;
}

export interface OnExitHook<C8 extends CoreConduit = CoreConduit> {
  onExit(
    payload: LifecyclePayload<C8>,
    recorder?: Recorder,
  ): CouldPromise<void>;
}

export interface OnDirectorEnterHook<C8 extends CoreConduit = CoreConduit> {
  onDirectorEnter(
    payload: LifecyclePayload<C8>,
    recorder?: Recorder,
  ): CouldPromise<void>;
}

export interface OnDirectorExitHook<C8 extends CoreConduit = CoreConduit> {
  onDirectorExit(
    payload: LifecyclePayload<C8>,
    recorder?: Recorder,
  ): CouldPromise<void>;
}

export interface OnActorEnterHook<C8 extends CoreConduit = CoreConduit> {
  onActorEnter(
    payload: LifecyclePayload<C8>,
    recorder?: Recorder,
  ): CouldPromise<void>;
}

export interface OnActorExitHook<C8 extends CoreConduit = CoreConduit> {
  onActorExit(
    payload: LifecyclePayload<C8>,
    recorder?: Recorder,
  ): CouldPromise<void>;
}

export interface OnActorErrorHook<C8 extends CoreConduit = CoreConduit> {
  onActorError(
    payload: LifecyclePayload<C8>,
    recorder?: Recorder,
  ): CouldPromise<void>;
}

export interface OnActorAssertStartHook<C8 extends CoreConduit = CoreConduit> {
  onActorAssertStart(
    payload: LifecyclePayload<C8>,
    recorder?: Recorder,
  ): CouldPromise<void>;
}

export interface OnActorAssertSuccessHook<
  C8 extends CoreConduit = CoreConduit,
> {
  onActorAssertSuccess(
    payload: LifecyclePayload<C8>,
    recorder?: Recorder,
  ): CouldPromise<void>;
}

export interface OnActorAssertFailHook<C8 extends CoreConduit = CoreConduit> {
  onActorAssertFail(
    payload: LifecyclePayload<C8>,
    recorder?: Recorder,
  ): CouldPromise<void>;
}

export interface OnDirectorAssertStartHook<
  C8 extends CoreConduit = CoreConduit,
> {
  onDirectorAssertStart(
    payload: LifecyclePayload<C8>,
    recorder?: Recorder,
  ): CouldPromise<void>;
}

export interface OnDirectorAssertSuccessHook<
  C8 extends CoreConduit = CoreConduit,
> {
  onDirectorAssertSuccess(
    payload: LifecyclePayload<C8>,
    recorder?: Recorder,
  ): CouldPromise<void>;
}

export interface OnDirectorAssertFailHook<
  C8 extends CoreConduit = CoreConduit,
> {
  onDirectorAssertFail(
    payload: LifecyclePayload<C8>,
    recorder?: Recorder,
  ): CouldPromise<void>;
}
