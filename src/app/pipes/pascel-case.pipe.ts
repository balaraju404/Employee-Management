import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "pascalCase"
})
export class PascalCasePipe implements PipeTransform {
  transform(value: any): any {
    if (!value) return value;

    let newStr = "";
    let capitalizeNext = true; // Flag to capitalize the next character

    for (let char of value) {
      if (char === ' ') {
        capitalizeNext = true; // Next character should be capitalized
      } else {
        if (capitalizeNext) {
          newStr += char.toUpperCase(); // Capitalize the character
          capitalizeNext = false; // Reset the flag
        } else {
          newStr += char.toLowerCase(); // Keep the character as lowercase
        }
      }
    }

    return newStr;
  }
}
