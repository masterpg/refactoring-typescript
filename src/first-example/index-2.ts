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

  getCharge(): number {
    let result = 0;
    switch (this.movie.priceCode) {
      case Movie.REGULAR:
        result += 2;
        if (this.daysRented > 2)
          result += (this.daysRented - 2) * 1.5;
        break;
      case Movie.CHILDREN:
        result += 1.5;
        if (this.daysRented > 3)
          result += (this.daysRented - 3) * 1.5;
        break;
      case Movie.NEW_RELEASE:
        result += this.daysRented * 3;
        break;
    }
    return result;
  }

  getFrequentRenterPoints(): number {
    if ((this.movie.priceCode === Movie.NEW_RELEASE) && this.daysRented > 1)
      return 2;
    else
      return 1;
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
    let result = `Rental Record for ${this.name}\n`;
    for (const each of this._rentals) {
      // この貸し出しに関する数値の表示
      result += `\t${each.movie.title}\t${each.getCharge()}\n`;
    }
    // フッタ部分の追加
    result += `Amount owed is ${this.getTotalCharge()}\n`;
    result += `You earned ${this.getTotalFrequentRenterPoints()} frequent renter points`;
    return result;
  }

  htmlStatement(): string {
    let result = `<h1>Rentals for <em>${this.name}</em></h1>\n<p>\n`;
    for (const each of this._rentals) {
      // この貸し出しに関する数値の表示
      result += `${each.movie.title}: ${each.getCharge()}<br>\n`;
    }
    result += `</p>\n`;
    // フッタ部分の追加
    result += `<p>You owe <em>${this.getTotalCharge()}</em></p>\n`;
    result += `<p>On this rental you earned <em>${this.getTotalFrequentRenterPoints()}</em> frequent renter points</p>`;
    return result;
  }

  private getTotalCharge(): number {
    let result = 0;
    for (const each of this._rentals) {
      result += each.getCharge();
    }
    return result;
  }

  private getTotalFrequentRenterPoints(): number {
    let result = 0;
    for (const each of this._rentals) {
      result += each.getFrequentRenterPoints();
    }
    return result;
  }
}
