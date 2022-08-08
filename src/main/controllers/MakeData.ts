import { Request, Response } from 'express';
import { RowAdapter, Type } from '../../adapter';
import { Spreadsheet } from '../../config/googleSheets';
import { formatDate } from '../../utils';

interface Params {
  pageName: string;
  dateStart: string;
  dateEnd: string;
}

export class MakeData {
  async handle(req: Request, res: Response) {
    try {
      const { pageName, dateStart, dateEnd } = req.query as unknown as Params;

      if (!pageName || !dateStart || !dateEnd) {
        return res.status(400).send('Missing params');
      }

      const spreadsheet = new Spreadsheet(
        process.env.PRIVATE_KEY as string,
        process.env.CLIENT_EMAIL as string,
        process.env.SPREAD_SHEET_ID as string
      );

      const rows = await spreadsheet.getRows(pageName);
      const filteredRows = rows.filter((row) => {
        const date = formatDate(row.discoveryDate);
        return date >= new Date(dateStart) && date <= new Date(dateEnd);
      });

      const typeStats = new Map<Type, RowAdapter[]>();

      filteredRows.forEach((row) => {
        const type = row.type;
        if (typeStats.has(type)) {
          typeStats.get(type)?.push(row);
        } else {
          typeStats.set(type, [row]);
        }
      });

      const itens = new Map<Type, unknown>();

      typeStats.forEach((type, key) => {
        const stateStats = {
          total: type.length
        };
        type.forEach(({ state }) => {
          if (stateStats[state]) {
            const count = stateStats[state];
            stateStats[state] = count + 1;
          } else {
            stateStats[state] = 1;
          }
        });

        itens.set(key, stateStats);
      });

      const result = Object.fromEntries([...itens.entries()]);

      return res.json({ result, total: filteredRows.length });
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal server error');
    }
  }
}
