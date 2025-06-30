"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Initialize1751305004385 = void 0;
const fs_1 = require("fs");
class Initialize1751305004385 {
    async up(queryRunner) {
        const lines = (0, fs_1.readFileSync)('../../movielist.csv')
            .toString('utf-8')
            .split('\n')
            .filter((line) => line.length > 0)
            .slice(1)
            .map((line) => {
            const [year, title, studios, producers, winner] = line.split(';');
            return [parseInt(year), title, studios, producers, !!winner];
        });
        for (const r of lines) {
            await queryRunner.query('insert into movie (year, title, studios, producers, winner) values ($1,$2,$3,$4,$5)', r);
        }
    }
    async down(_queryRunner) { }
}
exports.Initialize1751305004385 = Initialize1751305004385;
//# sourceMappingURL=1751305004385-Initialize.js.map