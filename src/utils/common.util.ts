export class CommonUtil {
  static getFullName(firstName: string, lastName: string, reverse = false) {
    return !reverse ? `${firstName} ${lastName}` : `${lastName} ${firstName}`;
  }

  /**
   * Return a random string with customized length
   * or a random length in range 4-8
   * @param length :number or blank
   * @returns string
   */
  static getRandomString(length?: number): string {
    if (!length) {
      length = 4 + Math.random() * 4;
    }

    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  static getRandomIntNumber(min: number, max: number) {
    return Math.floor(min + Math.random() * (max - min));
  }

  static getIdFromSlug(slug: string) {
    return slug.split('-').slice(-1)[0];
  }
}
