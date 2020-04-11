import {WrestlerModel} from './wrestler.model';

export class WrestlersModel {
  wrestlers: WrestlerModel[];

  constructor(wrestlers: WrestlerModel[]) {
    this.wrestlers = wrestlers;
  }
}
