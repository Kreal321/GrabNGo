import { Pipe, PipeTransform } from '@angular/core';
import { Status } from "../../core/enums/status.enum";
import { TranslateService } from "@ngx-translate/core";


@Pipe({name: 'statusStr'})

export class StatusStrPipe implements PipeTransform {

    constructor(
      private translate: TranslateService
    ) {}

    transform(status: Status): string {
      return status.split("_").map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(" ");
    }
}
