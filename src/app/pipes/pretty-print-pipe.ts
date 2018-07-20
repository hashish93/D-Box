import {Pipe, PipeTransform} from "@angular/core";
/**
 * Created by mohammed on 7/20/2018.
 */
@Pipe({
  name: 'prettyprint'
})
export class PrettyPrintPipe implements PipeTransform {
  transform(val) {
    return JSON.stringify(val, null, 2)
      .replace(' ', '&nbsp;')
      .replace('\n', '<br/>');
  }
}
