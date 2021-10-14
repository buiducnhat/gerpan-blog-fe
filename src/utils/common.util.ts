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

  static removeVietnameseAccent(char: string): string {
    char = char.toLowerCase();
    char = char.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    char = char.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    char = char.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    char = char.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    char = char.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    char = char.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    char = char.replace(/đ/g, 'd');
    // Some system encode vietnamese combining accent as individual utf-8 characters
    char = char.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
    char = char.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
    return char;
  }

  static makeSlug(str: string, tail = '') {
    str = this.removeVietnameseAccent(str);
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str
      .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return str + tail ? `-${tail}` : '';
  }
}
