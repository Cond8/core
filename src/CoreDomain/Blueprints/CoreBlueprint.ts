// src/CoreDomain/Blueprints/CoreBlueprint.ts

import { FullLifecycleBlueprint } from '../../Lifecycle/LifecycleEventHooks.js';
import { CoreConduit } from '../Conduits/CoreConduit.js';

export abstract class CoreBlueprint extends FullLifecycleBlueprint<CoreConduit> {
  abstract get readonly(): unknown;

  protected constructor(protected readonly key: string) {
    super();
  }

  public close(): void {
    // Close the blueprint to prevent memory leaks
  }
}
