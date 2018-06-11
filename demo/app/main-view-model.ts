import { Observable } from 'tns-core-modules/data/observable';
import { VectorIcons } from 'nativescript-vector-icons';

export class HelloWorldModel extends Observable {
  public message: string;
  private vectorIcons: VectorIcons;

  constructor() {
    super();

    this.vectorIcons = new VectorIcons();
    this.message = this.vectorIcons.message;
  }
}
