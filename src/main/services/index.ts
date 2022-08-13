import fs from 'fs';
import path from 'path';

interface Data {
  [key: string]: {
    [type: string]: number;
  };
}

export const makeMarkdown = (data: Data) => {
  const keys = Object.keys(data);

  const make = keys
    .map((type) => {
      const title = `**${type}**`;
      const nameType = Object.keys(data[type]);
      const countType = Object.values(data[type]);

      const types = nameType
        .map((name, i) => {
          return `- ${countType[i]} ${name}`;
        })
        .join('\n');

      return `${title}\n${types}`;
    })
    .join('\n\n');

  fs.writeFileSync(path.join(__dirname, '../../upload/file.md'), make);

  return make;
};
