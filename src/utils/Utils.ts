import * as bcrypt from 'bcrypt';
export class Utils {
  public static getZodiacSign(date: Date): string {
    const d = new Date(date);
    const day = d.getUTCDate();
    const month = d.getUTCMonth() + 1;
    const signs = [
      { sign: 'Capricorn', start: [12, 22], end: [1, 19] },
      { sign: 'Aquarius', start: [1, 20], end: [2, 18] },
      { sign: 'Pisces', start: [2, 19], end: [3, 20] },
      { sign: 'Aries', start: [3, 21], end: [4, 19] },
      { sign: 'Taurus', start: [4, 20], end: [5, 20] },
      { sign: 'Gemini', start: [5, 21], end: [6, 20] },
      { sign: 'Cancer', start: [6, 21], end: [7, 22] },
      { sign: 'Leo', start: [7, 23], end: [8, 22] },
      { sign: 'Virgo', start: [8, 23], end: [9, 22] },
      { sign: 'Libra', start: [9, 23], end: [10, 22] },
      { sign: 'Scorpio', start: [10, 23], end: [11, 21] },
      { sign: 'Sagittarius', start: [11, 22], end: [12, 21] },
    ];
    return (
      signs.find(({ start, end }) => {
        if (start[0] === 12 && month === 1 && day <= end[1]) return true;
        return (
          (month === start[0] && day >= start[1]) ||
          (month === end[0] && day <= end[1])
        );
      })?.sign || 'Unknown'
    );
  }

  public static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  public static async comparePassword(userPassword: string, dbPassword: string): Promise<boolean> {
    return await bcrypt.compare(userPassword, dbPassword);
  }

  public static getFormattedDate(date: Date) {
    return date.toISOString().slice(0, 10);
  }

  public static getLastNDates(n: number): string[] {
    const dates: string[] = [];
    for (let i = 0; i < n; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(this.getFormattedDate(date));
    }
    return dates;
  }

}

