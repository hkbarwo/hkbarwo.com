const { readFileSync, writeFileSync } = require('fs');
const matter = require('gray-matter')
const { stringify } = require("yaml")
const { flatten, unflatten } = require("flat");

const dict = [
  ["汪明荃 博士     ", "    DLitt, SBS 	Dr. Wang Ming-chuen Liza, DLitt, SBS"],
  ["理事會主席: 	  ", "			Chairman of Board of Directors"],
  ["汪明荃 博士     ", "    DLitt, SBS 	Dr. Wang Ming-chuen Liza, DLitt, SBS"],
  ["龍貫天 MH 		  ", "		Mr. Lung Koon-tin, MH"],
  ["副主席				  ", "	  Vice-Chairman"],
  ["龍貫天 MH			  ", "	  Mr. Lung Koon-tin, MH"],
  ["吳仟峰				  ", "	  Mr. Ng Chin-fung"],
  ["副主席				  ", "	  Vice-Chairman"],
  ["吳仟峰				  ", "	  Mr. Ng Chin-fung"],
  ["新劍郎 MH, CEC  ", "			Mr. Sun Kim-long, MH, CEC"],
  ["副主席				  ", "	Vice-Chairman"],
  ["新劍郎 MH, CEC  ", "			Mr. Sun Kim-long, MH, CEC"],
  ["陳鴻進				  ", "	Mr. Chan Hung-chun"],
  ["總務組主任		  ", "		Director of General Affairs"],
  ["陳鴻進				  ", "	Mr. Chan Hung-chun"],
  ["蔡之崴				  ", "	Mr. Tsai Chin-wei					"],
  ["總務組副主任	  ", "		Deputy Director of General Affairs Committee"],
  ["蔡之崴				  ", "	Mr. Tsai Chin-wei	"],
  ["吳立熙				  ", "	Mr. Ng Lap-hei"],
  ["總務組副主任	  ", "		Deputy Director of General Affairs Committee"],
  ["吳立熙				  ", "	Mr. Ng Lap-hei"],
  ["溫玉瑜				  ", "	Mr. Wan Yuk-yu"],
  ["財務組主任		  ", "		Director of Finance Committee"],
  ["溫玉瑜				  ", "	Mr. Wan Yuk-yu"],
  ["林群翎				  ", "	Ms. Lam Kwan-ling"],
  ["財務組副主任	  ", "		Deputy Director of Finance Committee"],
  ["林群翎				  ", "	Ms. Lam Kwan-ling"],
  ["譚兆威				  ", "	Mr. Tam Siu-wai"],
  ["財務組副主任	  ", "		Deputy Director of Finance Committee"],
  ["譚兆威				  ", "	Mr. Tam Siu-wai"],
  ["謝雪心				  ", "	Ms. Tse Suet-sum"],
  ["公關組主任		  ", "		Director of Public Affairs Committee"],
  ["謝雪心				  ", "	Ms. Tse Suet-sum"],
  ["鄧美玲				  ", "	Ms. Tang Mi-ling"],
  ["公關組副主任	  ", "		Deputy Director of Public Affairs Committee"],
  ["鄧美玲				  ", "	Ms. Tang Mi-ling"],
  ["梁心怡				  ", "	Ms. Leung Sum-yee"],
  ["公關組副主任	  ", "		Deputy Director of Public Affairs Committee"],
  ["梁心怡				  ", "	Ms. Leung Sum-yee"],
  ["陳咏儀				  ", "	Ms. Chan Wing-yee"],
  ["福利組主任		  ", "		Director of Welfare Committee"],
  ["陳咏儀				  ", "	Ms. Chan Wing-yee"],
  ["梁兆明				  ", "	Mr. Liang Zhaoming"],
  ["福利組副主任	  ", "		Deputy Director of Welfare Committee"],
  ["梁兆明				  ", "	Mr. Liang Zhaoming"],
  ["李沛妍				  ", "	Ms. Li Pui-yan"],
  ["福利組副主任	  ", "		Deputy Director of Welfare Committee"],
  ["李沛妍				  ", "	Ms. Li Pui-yan"],
  ["杜韋秀明			  ", "	Mrs. To Wai Sau Ming Marilyn"],
  ["調查組主任		  ", "		Director of Investigation Committee"],
  ["杜韋秀明			  ", "	Mrs. To Wai Sau Ming Marilyn"],
  ["林克輝				  ", "	Mr. Lam Hak-fai"],
  ["調查組副主任	  ", "		Deputy Director of Investigation Committee"],
  ["林克輝				  ", "	Mr. Lam Hak-fai"],
  ["陳榮貴				  ", "	Mr. Chan Wing-kwei"],
  ["調查組副主任	  ", "		Deputy Director of Investigation Committee"],
  ["陳榮貴				  ", "	Mr. Chan Wing-kwei"],
  ["黎耀威				  ", "	Mr. Lai Yiu-wai"],
  ["稽核組主任		  ", "		Director of Audit Committee"],
  ["黎耀威				  ", "	Mr. Lai Yiu-wai"],
  ["鄺炳全				  ", "	Mr. Kwong Bing-chuen"],
  ["稽核組副主任	  ", "		Deputy Director of Audit Committee"],
  ["鄺炳全				  ", "	Mr. Kwong Bing-chuen"],
  ["黃志光				  ", "	Mr. Wong Chi-kwong"],
  ["稽核組副主任	  ", "		Deputy Director of Audit Committee"],
  ["黃志光				  ", "	Mr. Wong Chi-kwong"],
  ["羅家英 MH			  ", "	Mr. Law Ka-yin, MH"],
  ["康樂組主任		  ", "		Director of Recreation Committee"],
  ["羅家英 MH			  ", "	Mr. Law Ka-yin, MH"],
  ["王潔清				  ", "	Ms. Wang Kit-ching"],
  ["康樂組副主任	  ", "		Deputy Director of Recreation Committee"],
  ["王潔清				  ", "	Ms. Wang Kit-ching"],
  ["洪海					  ", "  Mr. Hong Hai"],
  ["康樂組副主任	  ", "		Deputy Director of Recreation Committee"],
  ["洪海					  ", "  Mr. Hong Hai"],
  ["高潤鴻				  ", "	Mr. Ko Yun-hung"],
  ["組訓組主任		  ", "		Director of Training Committee"],
  ["高潤鴻				  ", "	Mr. Ko Yun-hung"],
  ["王超群				  ", "	Ms. Wong Chiu-kwan"],
  ["組訓組副主任	  ", "		Deputy Director of Training Committee"],
  ["王超群				  ", "	Ms. Wong Chiu-kwan"],
  ["劉惠鳴				  ", "	Ms. Lau Wai-ming"],
  ["組訓組副主任	  ", "		Deputy Director of Training Committee"],
  ["劉惠鳴				  ", "	Ms. Lau Wai-ming"],
].reduce((prevDict, [zhValue, enValue]) => {
  prevDict[zhValue.trim()] = enValue.trim()
  return prevDict
}, {})


const filePath = "../../data/about/organization/commitiees/39th.md"
const file = readFileSync(filePath)

const fileContent = matter(file)

const { data: frontMatter, content } = fileContent

let enFrontMatter = flatten(frontMatter.en)

Object.keys(enFrontMatter).forEach(key => {
  const value = enFrontMatter[key]
  if (dict[value]) {
    enFrontMatter[key] = dict[value]
  }
})

frontMatter.en = unflatten(enFrontMatter)

const newContent = `---\n${stringify(frontMatter)}---\n${content}`

writeFileSync(filePath, newContent)
