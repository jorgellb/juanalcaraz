import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projects = [
  { "title": "BAR PACO", "category": "FICCIÓN", "year": 2026, "videoUrl": "https://vimeo.com/1175416334", "order": 1, "featured": true },
  { "title": "ST. PAVLO – EL AMOR QUE TE HE TENIDO", "category": "VIDEOCLIP", "year": 2025, "videoUrl": "https://vimeo.com/1164987352", "order": 2, "featured": true },
  { "title": "FINI X LACASITOS Turrón Navidad", "category": "PUBLICIDAD", "year": 2025, "videoUrl": "https://www.youtube.com/watch?v=wztRPYv-O4o", "order": 3, "featured": true },
  { "title": "FUNDACIÓN PONCEMAR", "category": "PUBLICIDAD", "year": 2025, "videoUrl": "https://vimeo.com/1153500649", "order": 4, "featured": true },
  { "title": "ADIÓS NOVIEMBRE – ADIÓS NOVIEMBRE", "category": "VIDEOCLIP", "year": 2025, "videoUrl": "https://www.youtube.com/watch?v=Mj9vwcuYiJg", "order": 5, "featured": false },
  { "title": "APOCALYPSE – BBOY ALVARONE X DJ RAFAKA", "category": "OTRAS PRODUCCIONES", "year": 2025, "videoUrl": "https://www.youtube.com/watch?v=z6RBb42q_7k", "order": 6, "featured": false },
  { "title": "ST. PAVLO – DISPÁRAME", "category": "VIDEOCLIP", "year": 2025, "videoUrl": "https://www.youtube.com/watch?v=Ijv4Fdiqsq0", "order": 7, "featured": false },
  { "title": "DOS BORRACHOS, UNA LATA Y UNA FAROLA", "category": "FICCIÓN", "year": 2024, "videoUrl": "https://www.youtube.com/watch?v=_inWKcgoY0g", "order": 8, "featured": false },
  { "title": "EMBARAZADO", "category": "FICCIÓN", "year": 2024, "videoUrl": "https://vimeo.com/1040713949", "order": 9, "featured": false },
  { "title": "CATERINA ROSS – SHADOWS IN YOUR WAY", "category": "VIDEOCLIP", "year": 2024, "videoUrl": "https://vimeo.com/1058896601", "order": 10, "featured": false },
  { "title": "TINA X – FUERTE Y QUEER", "category": "VIDEOCLIP", "year": 2024, "videoUrl": "https://www.youtube.com/watch?v=L3YIu2xbQdU", "order": 11, "featured": false },
  { "title": "MARWÁN – NANA URGENTE PARA PALESTINA", "category": "VIDEOCLIP", "year": 2024, "videoUrl": "https://www.youtube.com/watch?v=4FzN5MnQyfY", "order": 12, "featured": false },
  { "title": "GRAND HYATT LA MANGA CLUB GOLF & SPA", "category": "PUBLICIDAD", "year": 2023, "videoUrl": "https://vimeo.com/906668759", "order": 13, "featured": false },
  { "title": "ADIÓS NOVIEMBRE – CRIMEN Y CONDENA", "category": "VIDEOCLIP", "year": 2023, "videoUrl": "https://www.youtube.com/watch?v=-IPMJSGyE2M", "order": 14, "featured": false },
  { "title": "HACK MAFIZ MÁLAGA", "category": "OTRAS PRODUCCIONES", "year": 2023, "videoUrl": "https://vimeo.com/881583687", "order": 15, "featured": false },
  { "title": "HE PESCADO", "category": "FICCIÓN", "year": 2022, "videoUrl": "https://vimeo.com/761798449", "order": 16, "featured": false },
  { "title": "TINA X – MARICÓN", "category": "VIDEOCLIP", "year": 2022, "videoUrl": "https://www.youtube.com/watch?v=FAMP6qJgbis", "order": 17, "featured": false },
  { "title": "ADIÓS NOVIEMBRE – EL PEOR DESASTRE", "category": "VIDEOCLIP", "year": 2022, "videoUrl": "https://www.youtube.com/watch?v=CgFRXTn73us", "order": 18, "featured": false },
  { "title": "LIDERA TU FUTURO – UCAM UNIVERSIDAD", "category": "PUBLICIDAD", "year": 2022, "videoUrl": "https://www.youtube.com/watch?v=hIJzwRBuunU", "order": 19, "featured": false },
  { "title": "ADIÓS NOVIEMBRE – PLAN MARSHALL", "category": "VIDEOCLIP", "year": 2022, "videoUrl": "https://www.youtube.com/watch?v=9x9b-kwR1do", "order": 20, "featured": false },
  { "title": "CABALLITO DE MAR – Por un Mar Menor vivo", "category": "OTRAS PRODUCCIONES", "year": 2021, "videoUrl": "https://www.youtube.com/watch?v=LKZggDELfps", "order": 21, "featured": false },
  { "title": "ADIÓS NOVIEMBRE – SALTO MORTAL", "category": "VIDEOCLIP", "year": 2021, "videoUrl": "https://www.youtube.com/watch?v=GW-XI-G8Ozw", "order": 22, "featured": false },
  { "title": "ADIÓS NOVIEMBRE – ECO", "category": "VIDEOCLIP", "year": 2021, "videoUrl": "https://vimeo.com/619696811", "order": 23, "featured": false },
  { "title": "AYOHO & MARÍA DE JUAN – EL ESPEJO", "category": "VIDEOCLIP", "year": 2021, "videoUrl": "https://vimeo.com/556588411", "order": 24, "featured": false },
  { "title": "EL ÚNICO – ZUMO PAL DESAYUNO", "category": "VIDEOCLIP", "year": 2021, "videoUrl": "https://vimeo.com/554338213", "order": 25, "featured": false },
  { "title": "VECINOS", "category": "FICCIÓN", "year": 2020, "videoUrl": "https://vimeo.com/491715947", "order": 26, "featured": false },
  { "title": "INGLÉS BRITÁNICO", "category": "FICCIÓN", "year": 2020, "videoUrl": "https://vimeo.com/454742550", "order": 27, "featured": false },
  { "title": "MURCIA, UNA CIUDAD PARA RECORDAR", "category": "PUBLICIDAD", "year": 2020, "videoUrl": "https://www.youtube.com/watch?v=oODBHMp6yEM", "order": 28, "featured": false },
  { "title": "LA ANTIGÜEDAD TARDÍA. LOS POBLADORES DEL SURESTE", "category": "OTRAS PRODUCCIONES", "year": 2020, "videoUrl": "https://vimeo.com/419826201", "order": 29, "featured": false },
  { "title": "HE LLEGADO", "category": "FICCIÓN", "year": 2020, "videoUrl": "https://vimeo.com/396787914", "order": 30, "featured": false },
  { "title": "LA CASICA DE PAPEL", "category": "FICCIÓN", "year": 2019, "videoUrl": "https://www.youtube.com/watch?v=PqSZ4KhmrLc", "order": 31, "featured": false },
  { "title": "EL ENCUENTRO", "category": "FICCIÓN", "year": 2018, "videoUrl": "https://vimeo.com/318196671", "order": 32, "featured": false },
  { "title": "LONJA", "category": "FICCIÓN", "year": 2018, "videoUrl": "https://vimeo.com/296375422", "order": 33, "featured": false }
];

const targetDir = path.join(__dirname, 'content', 'projects');

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

console.log('Projects repopulated with new data order.');
