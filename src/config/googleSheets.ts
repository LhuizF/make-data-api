import { GoogleSpreadsheet } from 'google-spreadsheet';
import { RowAdapter } from '../adapter';

export class Spreadsheet {
  private spreadSheet: GoogleSpreadsheet;

  constructor(
    private readonly privateKey: string,
    private readonly clientEmail: string,
    private readonly spreadsheetId: string
  ) {}

  async init(): Promise<GoogleSpreadsheet> {
    this.spreadSheet = new GoogleSpreadsheet(this.spreadsheetId);

    await this.spreadSheet.useServiceAccountAuth({
      client_email: this.clientEmail,
      private_key: this.getPrivateKey()
    });

    await this.spreadSheet.loadInfo();

    return this.spreadSheet;
  }

  getPrivateKey(): string {
    return this.privateKey.replace(/\\n/g, '\n');
  }

  async getRows(sheetName: string): Promise<RowAdapter[]> {
    await this.init();

    const page = this.spreadSheet.sheetsByTitle[sheetName];

    const rows = await page.getRows();
    return rows.map((row) => new RowAdapter(row));
  }
}
