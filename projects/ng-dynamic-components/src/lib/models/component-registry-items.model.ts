import { Type } from "@angular/core";

export interface ComponentRegistryItems {
  [name: string]: Type<any>
}
