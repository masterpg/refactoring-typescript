(async () => {
  mocha.setup({ ui: 'tdd' });

  await Promise.all([
    require('./greeting'),
    require('./first-example'),
  ]);

  mocha.run();
})();
