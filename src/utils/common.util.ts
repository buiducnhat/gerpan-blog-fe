export class CommonUtil {
  static getFullName(firstName: string, lastName: string, reverse = false) {
    return !reverse ? `${firstName} ${lastName}` : `${lastName} ${firstName}`;
  }
}
