import { GoogleSpreadsheet } from 'google-spreadsheet';

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

  async getRows(sheetName: string): Promise<any> {
    await this.init();

    const rows = this.spreadSheet.sheetsByTitle[sheetName];

    return await rows.getRows();
  }
}
