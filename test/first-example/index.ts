import { Customer, Movie, Rental } from '../../src/first-example';

const assert = chai.assert;

suite('first-example', () => {

  const movieCommando = new Movie('コマンドー', Movie.REGULAR);
  const movieStandByMe = new Movie('スタンド・バイ・ミー', Movie.REGULAR);
  const movieYourName = new Movie('君の名は。', Movie.NEW_RELEASE);

  const sakuragi = new Customer('桜木 花道');
  const gori = new Customer('赤木 剛憲');

  setup(() => {
  });

  teardown(() => {
  });

  test('statement(): 出力される明細内容の検証', () => {
    // ｢桜木 花道｣が｢コマンドー｣と｢君の名は。｣を｢7日間｣レンタルする
    sakuragi.addRental(new Rental(movieCommando, 7));
    sakuragi.addRental(new Rental(movieYourName, 7));
    // ｢桜木 花道｣がレンタルした明細を取得
    const statement = sakuragi.statement();
    console.log(`\n\n${statement}\n\n`);
    assert.equal(statement,
      'Rental Record for 桜木 花道\n\tコマンドー\t9.5\n\t君の名は。\t21\nAmount owed is 30.5\nYou earned 3 frequent renter points');
  });

  // test('htmlStatement(): 出力される明細内容の検証', () => {
  //   // ｢桜木 花道｣が｢コマンドー｣と｢君の名は。｣を｢7日間｣レンタルする
  //   sakuragi.addRental(new Rental(movieCommando, 7));
  //   sakuragi.addRental(new Rental(movieYourName, 7));
  //   // ｢桜木 花道｣がレンタルした明細を取得
  //   const statement = sakuragi.htmlStatement();
  //   console.log(`\n\n${statement}\n\n`);
  // });

});
