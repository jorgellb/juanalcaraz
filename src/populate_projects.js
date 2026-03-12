import fs from 'fs';
import path from 'path';

const projects = [
  { "title": "APOCALYPSE - BBOY ALVARONE X DJ RAFAKA", "category": "DANCE VIDEO", "year": 2025, "videoUrl": "https://vimeo.com/1058585869", "order": 1, "featured": true },
  { "title": "ST. PAVLO - DISPÁRAME", "category": "VIDEOCLIP", "year": 2025, "videoUrl": "https://vimeo.com/1058584197", "order": 2, "featured": true },
  { "title": "DOS BORRACHOS, UNA LATA Y UNA FAROLA", "category": "CORTOMETRAJE", "year": 2024, "videoUrl": "https://vimeo.com/1040695813", "order": 3, "featured": true },
  { "title": "EMBARAZADO", "category": "CORTOMETRAJE", "year": 2024, "videoUrl": "https://vimeo.com/1040713949", "order": 4, "featured": true },
  { "title": "CATERINA ROSS - SHADOWS IN YOUR WAY", "category": "VIDEOCLIP", "year": 2024, "videoUrl": "https://vimeo.com/1058896601", "order": 5, "featured": false },
  { "title": "TINA X - FUERTE Y QUEER", "category": "VIDEOCLIP", "year": 2024, "videoUrl": "https://vimeo.com/968703959", "order": 6, "featured": false },
  { "title": "MARWÁN - NANA URGENTE PARA PALESTINA", "category": "VIDEOCLIP", "year": 2024, "videoUrl": "https://vimeo.com/906664472", "order": 7, "featured": false },
  { "title": "GRAND HYATT LA MAGA CLUB GOLF & SPA", "category": "SPOT", "year": 2023, "videoUrl": "https://vimeo.com/906668759", "order": 8, "featured": false },
  { "title": "ADIÓS NOVIEMBRE - CRIMEN Y CONDENA", "category": "VIDEOCLIP", "year": 2023, "videoUrl": "https://vimeo.com/834706662", "order": 9, "featured": false },
  { "title": "TINA X - ENORGULLÉCETE", "category": "VIDEOCLIP", "year": 2023, "videoUrl": "https://vimeo.com/836803457", "order": 10, "featured": false },
  { "title": "HACK MAFIZ MÁLAGA", "category": "AUTORRETRATO GANADOR", "year": 2023, "videoUrl": "https://vimeo.com/881583687", "order": 11, "featured": false },
  { "title": "HE PESCADO", "category": "CORTOMETRAJE", "year": 2022, "videoUrl": "https://vimeo.com/782273159", "order": 12, "featured": false },
  { "title": "TINA X - MARICÓN", "category": "VIDEOCLIP", "year": 2022, "videoUrl": "https://vimeo.com/781934773", "order": 13, "featured": false },
  { "title": "ADIÓS NOVIEMBRE - EL PEOR DESASTRE", "category": "LYRIC VIDEO", "year": 2022, "videoUrl": "https://www.youtube.com/watch?v=CgFRXTn73us", "order": 14, "featured": false },
  { "title": "LIDERA TU FUTURO - UCAM UNIVERSIDAD", "category": "SPOT", "year": 2022, "videoUrl": "https://vimeo.com/733130587", "order": 15, "featured": false },
  { "title": "ADIÓS NOVIEMBRE - PLAN MARSHALL", "category": "LYRIC VIDEO", "year": 2022, "videoUrl": "https://www.youtube.com/watch?v=9x9b-kwR1do", "order": 16, "featured": false },
  { "title": "CABALLITO DE MAR", "category": "CORTOMETRAJE - SPOT", "year": 2021, "videoUrl": "https://vimeo.com/655415480", "order": 17, "featured": false },
  { "title": "ADIÓS NOVIEMBRE- SALTO MORTAL", "category": "VIDEOCLIP", "year": 2021, "videoUrl": "https://www.youtube.com/watch?v=GW-XI-G8Ozw", "order": 18, "featured": false },
  { "title": "ADIÓS NOVIEMBRE - ECO", "category": "VIDEOCLIP", "year": 2021, "videoUrl": "https://www.youtube.com/watch?v=q5BESvp2u-g", "order": 19, "featured": false },
  { "title": "AYOHO & MARÍA DE JUAN - EL ESPEJO", "category": "VIDEOCLIP", "year": 2021, "videoUrl": "https://vimeo.com/556588411", "order": 20, "featured": false },
  { "title": "EL ÚNICO - ZUMO PAL DESAYUNO", "category": "VIDEOCLIP", "year": 2021, "videoUrl": "https://vimeo.com/554338213", "order": 21, "featured": false },
  { "title": "VECINOS", "category": "CORTOMETRAJE", "year": 2020, "videoUrl": "https://vimeo.com/491715947", "order": 22, "featured": false },
  { "title": "INGLÉS BRITÁNICO", "category": "CORTOMETRAJE", "year": 2020, "videoUrl": "https://vimeo.com/454742550", "order": 23, "featured": false },
  { "title": "MURCIA. UNA CIUDAD PARA RECORDAR", "category": "SPOT", "year": 2020, "videoUrl": "https://vimeo.com/518253913", "order": 24, "featured": false },
  { "title": "LA ANTIGÜEDAD TARDÍA. LOS POBLADORES DEL SURESTE", "category": "MEDIOMETRAJE - DOCUMENTAL", "year": 2020, "videoUrl": "https://vimeo.com/419826201", "order": 25, "featured": false },
  { "title": "ÁLVARO BENITO - MI FORTALEZA", "category": "LYRIC VIDEO", "year": 2020, "videoUrl": "https://vimeo.com/405896453", "order": 26, "featured": false },
  { "title": "HE LLEGADO", "category": "CORTOMETRAJE", "year": 2020, "videoUrl": "https://vimeo.com/396787914", "order": 27, "featured": false },
  { "title": "TU SÉPTIMO ARTE - IGNACIO MARTÍN LERMA & EDU MARTÍNEZ", "category": "VIDEOCLIP - VIDEOPOEMA", "year": 2019, "videoUrl": "https://vimeo.com/468212440", "order": 28, "featured": false },
  { "title": "DENTRO", "category": "CORTOMETRAJE", "year": 2019, "videoUrl": "https://vimeo.com/391590735", "order": 29, "featured": false },
  { "title": "LA CASICA DE PAPEL", "category": "CORTOMETRAJE - PARODIA", "year": 2019, "videoUrl": "https://vimeo.com/349077675", "order": 30, "featured": false },
  { "title": "EL ENCUENTRO", "category": "CORTOMETRAJE", "year": 2018, "videoUrl": "https://vimeo.com/318196671", "order": 31, "featured": false },
  { "title": "LONJA", "category": "CORTOMETRAJE", "year": 2018, "videoUrl": "https://vimeo.com/296375422", "order": 32, "featured": false },
  { "title": "LOS CUATRO DE MR. M", "category": "MEDIOMETRAJE", "year": 2017, "videoUrl": "https://vimeo.com/286332207", "order": 33, "featured": false }
];

const targetDir = 'c:/Users/Jorge/Documents/juan/src/content/projects';

// Clean existing files
if (fs.existsSync(targetDir)) {
  fs.readdirSync(targetDir).forEach(file => {
    fs.unlinkSync(path.join(targetDir, file));
  });
} else {
  fs.mkdirSync(targetDir, { recursive: true });
}

projects.forEach(p => {
  const filename = p.order.toString().padStart(2, '0') + '-' + p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '.json';
  fs.writeFileSync(path.join(targetDir, filename), JSON.stringify(p, null, 2));
});
