import { CoreRedprint } from '../CoreDomain/index.js';
import { StagedActor } from './create-actor.js';
import { createDirector } from './create-director.js';

let sceneIdx = 0;

export function createScene<C8 extends CoreRedprint>(
  ...actors: StagedActor<C8>[]
) {
  return createDirector<C8>(`Scene ${sceneIdx++}`)(...actors);
}
