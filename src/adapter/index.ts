import { GoogleSpreadsheetRow } from 'google-spreadsheet';

type Type = 'Feature' | 'Bug fix' | 'Hot fix';

type Platform = 'Desktop' | 'Android' | 'IOS';

type State =
  | 'Em análise'
  | 'Enviado para validação'
  | 'Desenvolvimento'
  | 'Validação UX'
  | 'Stand By'
  | 'Ação de outro time'
  | 'Cancelado'
  | 'Análise UX'
  | 'Acompanhamento'
  | 'em MR';

export class RowAdapter {
  readonly rowNumber: number;
  readonly rawData: string[];
  readonly page: string;
  readonly discovery: string;
  readonly description: string;
  readonly type: Type;
  readonly platform: Platform;
  readonly image: string;
  readonly teamUX: string;
  readonly teamTI: string;
  readonly hurdle: string;
  readonly state: State;
  readonly ascentDate: string;
  readonly completion: string;

  constructor(row: GoogleSpreadsheetRow) {
    this.rowNumber = row._rowNumber;
    this.rawData = row._rawData;
    this.page = row['Página'];
    this.discovery = row['Descoberta'];
    this.description = row['Descrição'];
    this.type = row['Tipo'];
    this.platform = row['Erro'];
    this.image = row['Mídia'];
    this.teamUX = row['Time UX'];
    this.teamTI = row['Time TI'];
    this.hurdle = row['Empecilho'];
    this.state = row['Estado'];
    this.ascentDate = row['Subida (data)'];
    this.completion = row['Conclusão (data)'];
  }
}

export type Rows = RowAdapter[];
