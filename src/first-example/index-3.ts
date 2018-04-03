export class Movie {
  static readonly CHILDREN: number = 2;
  static readonly REGULAR: number = 0;
  static readonly NEW_RELEASE: number = 1;

  private _title: string;
  private _price: Price;

  constructor(title: string, priceCode: number) {
    this._title = title;
    this._price = Price.newPrice(priceCode);
  }

  get priceCode(): number {
    return this._price.priceCode;
  }

  set priceCode(value: number) {
    this._price = Price.newPrice(value);
  }

  get title(): string {
    return this._title;
  }

  getCharge(daysRented: number): number {
    return this._price.getCharge(daysRented);
  }

  getFrequentRenterPoints(daysRented: number): number {
    return this._price.getFrequentRenterPoints(daysRented);
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
    return this.movie.getCharge(this.daysRented);
  }

  getFrequentRenterPoints(): number {
    return this.movie.getFrequentRenterPoints(this.daysRented);
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


export abstract class Price {
  abstract get priceCode(): number;
  abstract getCharge(daysRented: number): number;

  static newPrice(value: number): Price {
    switch (value) {
      case Movie.REGULAR:
        return new RegularPrice();
      case Movie.CHILDREN:
        return new ChildrenPrice();
      case Movie.NEW_RELEASE:
        return new NewReleasePrice();
      default:
        throw new Error('不正な料金コード');
    }
  }

  getFrequentRenterPoints(daysRented: number): number {
    return 1;
  }
}

export class RegularPrice extends Price {
  get priceCode(): number {
    return Movie.REGULAR;
  }

  getCharge(daysRented: number): number {
    let result = 2;
    if (daysRented > 2)
      result += (daysRented - 2) * 1.5;
    return result;
  }
}

export class ChildrenPrice extends Price {
  get priceCode(): number {
    return Movie.CHILDREN;
  }

  getCharge(daysRented: number): number {
    let result = 1.5;
    if (daysRented > 3)
      result += (daysRented - 3) * 1.5;
    return result;
  }
}

export class NewReleasePrice extends Price {
  get priceCode(): number {
    return Movie.NEW_RELEASE;
  }

  getCharge(daysRented: number): number {
    return daysRented * 3;
  }

  getFrequentRenterPoints(daysRented: number): number {
    if (daysRented > 1)
      return 2;
    else
      return 1;
  }
}
