// src/CoreInfra/create-role.ts
import { CoreConduit } from '../CoreDomain/Conduits/CoreConduit.js';
import { LifecyclePayload } from '../Lifecycle/Vacuum.js';
import { MetaHook } from '../Metadata/hooks.js';
import { Recorder } from '../Recorder/create-recorder.js';
import { CouldPromise } from '../utils/fn-promise-like.js';
import { createActor, StagedActor } from './create-actor.js';

export type ActorScript<C8 extends CoreConduit> = (
  c8: C8,
  recorder?: Recorder,
) => CouldPromise<C8>;

export interface ActorScriptWithTest<C8 extends CoreConduit>
  extends ActorScript<C8> {
  test(
    recorder: Recorder,
    c8Mock: C8,
    directorPayload: LifecyclePayload<C8>,
  ): CouldPromise<C8>;
}

export type NeedsMetadata<T extends CoreConduit> = (
  actorName: string,
  ...metadataRest: unknown[]
) => StagedActor<T>;

export type NeedsActorsScript<T extends CoreConduit> = (
  actorScript: ActorScript<T>,
) => StagedActor<T>;

export type NeedsActorsScriptAndMetadata<T extends CoreConduit> = (
  actorScript: ActorScript<T>,
) => NeedsMetadata<T>;

export function createRole<T extends CoreConduit>(
  actorScript: ActorScript<T>,
): NeedsMetadata<T>;

export function createRole<T extends CoreConduit>(
  actorName: string,
  ...metadata: unknown[]
): NeedsActorsScript<T>;

export function createRole<T extends CoreConduit>(
  metaHook: MetaHook,
  ...metadata: unknown[]
): NeedsActorsScriptAndMetadata<T>;

export function createRole<T extends CoreConduit>(
  firstArg: string | MetaHook | ActorScript<T>,
  ...restArgs: unknown[]
) {
  // Case 1: When the first argument is a string (role name)
  if (typeof firstArg === 'string') {
    return (actorScript: ActorScript<T>) => {
      if (typeof actorScript !== 'function') {
        throw new Error('Expected actorScript to be a function.');
      }
      return createActor<T>(firstArg, actorScript, ...restArgs);
    };
  }

  // Case 2: When the first argument is an instance of MetaHook
  else if (firstArg instanceof MetaHook) {
    return (actorScript: ActorScript<T>) => {
      if (typeof actorScript !== 'function') {
        throw new Error('Expected actorScript to be a function.');
      }
      return (actorName: string, ...metadataRest: unknown[]) => {
        return createActor(
          actorName,
          actorScript,
          firstArg,
          ...restArgs,
          ...metadataRest,
        );
      };
    };
  }

  // Case 3: When the first argument is an actor script
  else if (typeof firstArg === 'function') {
    return (actorName: string, ...metadataRest: unknown[]) => {
      return createActor<T>(actorName, firstArg, ...metadataRest);
    };
  }

  throw new Error('Invalid arguments passed to define an Actor.');
}
