import { GoogleSpreadsheetRow } from 'google-spreadsheet';

export type Type = 'Feature' | 'Bug fix' | 'Hot fix';

type Platform = 'Desktop' | 'Android' | 'IOS';

export type State =
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
  readonly discoveryDate: string;
  readonly description: string;
  readonly type: Type;
  readonly platform: Platform;
  readonly image: string;
  readonly teamUX: string;
  readonly teamTI: string;
  readonly hurdle: string;
  readonly state: State;
  readonly ascentDate: string;
  readonly completionDate: string;

  constructor(row: GoogleSpreadsheetRow) {
    this.rowNumber = row._rowNumber;
    //this.rawData = row._rawData;
    //this.page = row['Página'];
    this.discoveryDate = row['Descoberta (data)'];
    //this.description = row['Descrição'];
    this.type = row['Tipo'];
    //this.platform = row['Erro'];
    //this.image = row['Mídia'];
    //this.teamUX = row['Time UX'];
    //this.teamTI = row['Time TI'];
    //this.hurdle = row['Empecilho'];
    this.state = row['Estado em Qualidade'] || row['Estado'] || 'Em aberto';
    //this.ascentDate = row['Subida (data)'];
    //this.completionDate = row['Conclusão (data)'];
  }
}

export type Rows = RowAdapter[];
