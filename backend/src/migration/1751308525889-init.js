const fs = require('fs');
const path = require('path');

module.exports = class init1751308525889 {
  async up(queryRunner) {
    const lines = fs
      .readFileSync(path.resolve(__dirname, '../../../movielist.csv'))
      .toString('utf-8')
      .split('\n')
      .filter((line) => line.length > 0)
      .slice(1)
      .map((line) => {
        const [year, title, studios, producers, winner] = line.split(';');
        return [parseInt(year), title, studios, producers, !!winner];
      });
    for (const r of lines) {
      await queryRunner.query(
        'insert into movies (year, title, studios, producers, winner) values ($1,$2,$3,$4,$5)',
        r,
      );
    }
  }

  async down(queryRunner) {}
};
