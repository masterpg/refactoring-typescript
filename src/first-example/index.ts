export class Movie {
  static readonly CHILDREN: number = 2;
  static readonly REGULAR: number = 0;
  static readonly NEW_RELEASE: number = 1;

  private _title: string;
  private _priceCode: number;

  constructor(title: string, priceCode: number) {
    this._title = title;
    this._priceCode = priceCode;
  }

  get priceCode(): number {
    return this._priceCode;
  }

  set priceCode(value: number) {
    this._priceCode = value;
  }

  get title(): string {
    return this._title;
  }
}


export class Rental {
  private _movie: Movie;
  private _daysRented: number;

  constructor(movie: Movie, daysRented: number) {
    this._movie = movie;
    this._daysRented = daysRented;
  }

  get daysRented(): number {
    return this._daysRented;
  }

  get movie(): Movie {
    return this._movie;
  }
}


export class Customer {
  private _name: string;
  private _rentals: Rental[] = [];

  constructor(name: string) {
    this._name = name;
  }

  addRental(arg: Rental): void {
    this._rentals.push(arg);
  }

  get name(): string {
    return this._name;
  }

  statement(): string {
    let totalAmount = 0;
    let frequentRenterPoints = 0;
    let result = `Rental Record for ${this.name}\n`;
    for (const each of this._rentals) {
      let thisAmount = 0;

      // 一行ごとに金額を計算
      switch (each.movie.priceCode) {
        case Movie.REGULAR:
          thisAmount += 2;
          if (each.daysRented > 2)
            thisAmount += (each.daysRented - 2) * 1.5;
          break;
        case Movie.CHILDREN:
          thisAmount += 1.5;
          if (each.daysRented > 3)
            thisAmount += (each.daysRented - 3) * 1.5;
          break;
        case Movie.NEW_RELEASE:
          thisAmount += each.daysRented * 3;
          break;
      }

      // レンタルポイントを加算
      frequentRenterPoints++;
      // 新作を二日間以上借りた場合はボーナスポイント
      if ((each.movie.priceCode === Movie.NEW_RELEASE) && each.daysRented > 1)
        frequentRenterPoints++;

      // この貸し出しに関する数値の表示
      result += `\t${each.movie.title}\t${thisAmount}\n`;
      totalAmount += thisAmount;
    }
    // フッタ部分の追加
    result += `Amount owed is ${totalAmount}\n`;
    result += `You earned ${frequentRenterPoints} frequent renter points`;
    return result;
  }
}
