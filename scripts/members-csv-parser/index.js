const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

let count = 0

fs.createReadStream('data.csv')
  .pipe(csv({
    headers: ['nameZh', 'role', 'alias', 'nameEn', 'gender', 'position'],
    mapValues: ({ header, value: rawValue }) => {
      let value = rawValue.trim().replace(/\r?\n|\r/g, '');
      switch (header) {
        case 'gender':
          if (value === '男') {
            return 'm';
          } else if (value === '女') {
            return 'f';
          }
          break;
      
        default:
          break;
      }
      return value;
    }
  }))
  .on('data', (data) => {
    const {
      nameZh,
      role,
      alias = '',
      nameEn = '',
      gender,
      position,
    } = data;

    count += 1;

    const slug = nameEn.toLowerCase().replace(/\s/g, '-');

    fs.writeFileSync(
      path.resolve(__dirname, '../../data/members/items', `${slug}.md`),
      `---
zh:
  gender: ${gender}
  position: ${position}
  slug: ${slug}
  alias: ${alias}
  photo: /uploads/member/photos/default.png
  role: ${role}
  title: ${nameZh || nameEn}
  thoughts: ""
  description: ""
en:
  role: ${role}
  position: ${position}
  title: ${nameEn || nameZh}
  alias: ${alias}
  description: ""
  thoughts: ""
---
`);
  }).on('end', () => {
    console.log(`Imported ${count} members`);
  });
