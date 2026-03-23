const fs = require('fs');
const path = require('path');

const text = `2026
• BAR PACO
Cortometraje
Director – Co-Guionista – Co-Productor - Editor
• DISTRITO 30500Z
Serie
Primer ayudante de dirección
• UNRWA. TESTAMENTO SOLIDARIO
Spot
Director – Co-Productor – Editor
2025
• ÚLTIMA GENERACIÓN
Cortometraje
Segundo ayudante de dirección - Editor
• ESSENZIA DORMIRE. TRUST, CLOSE YOUR EYES.
Publicidad
Director
• UVAS MOYCA. LA BUENA UVA
Publicidad
Director
• ST. PAVLO - EL AMOR QUE TE HE TENIDO
Videoclip
Director
• FINI X LACASITOS. TURRÓN NAVIDAD 2025
Publicidad
Director – Guionista
• SR. BIZARRO – SÚPERMUSA
Videoclip
Director - Editor
• ADIÓS NOVIEMBRE – ADIÓS NOVIEMBRE
Videoclip
Director – Editor
• LAURA DIEPSTRATEN – AMOR DE VERANO
Videoclip
Director – Productor – Editor
• PEDRO NAVARRO - MASSIVO
Videoclip
Director – Productor
• APOCALYPSE
Dance Video
Director – Productor – Editor
• ST. PAVLO – DISPÁRAME
Videoclip
Director
• FUNDACIÓN PONCEMAR. JUGANDO CONMIGO
Spot
Co-Director – Co-Productor
• BESOS ROBADOS
Largometraje
Segundo ayudante de dirección
2024
• DOS BORRACHOS, UNA LATA Y UNA FAROLA
Cortometraje
Director – Guionista – Co-Productor – Editor
• EMBARAZADO
Cortometraje
Director – Guionista – Co-Productor – Editor
• NEGRO AZABACHE
Cortometraje
Primer ayudante de dirección
• ¡QUÉ IMPORTA LA EDAD!
Videopodcast
Director – Co-Productor - Editor
• SAIKO FT OMAR MONTES – YO LO SOÑÉ
Videoclip
Auxiliar de dirección
• TINA X – FUERTE Y QUEER
Videoclip
Director – Productor – Editor
• MARWÁN – NANA URGENTE PARA PALESTINA
Videoclip
Director – Productor – Editor
• UCAM – LIDERA TU FUTURO 2024
Spot
Primer ayudante de dirección
2023
• GRAND HYATT. LA MANGA CLUB GOLF & SPA
Publicidad
Director
• HACK MAFIZ MÁLAGA. AUTORRETRATO GANADOR
Autorretrato
Director – Guionista - Productor - Editor
• ADIÓS NOVIEMBRE – CRIMEN Y CONDENA
Videoclip
Director – Guionista – Co-productor – Editor
• CATERINA ROSS – SHADOWS IN YOUR WAY
Videoclip
Director – Editor
• LABERINTO DE SOMBRAS
Largometraje
Segundo ayudante de dirección
• UCAM – LIDERA TU FUTURO 2023
Spot
Primer ayudante de dirección
2022
• HE PESCADO
Cortometraje
Co-Director – Co-Guionista – Co-Productor – Co-Editor
• TINA X – ENORGULLÉCETE
Videoclip
Director – Productor – Editor
• TINA X – MARICÓN
Videoclip
Director – Productor – Editor
• ADIÓS NOVIEMBRE – EL PEOR DESASTRE
Lyric Video
Director – Productor – Editor
• ADIÓS NOVIEMBRE – PLAN MARSHALL
Lyric Video
Director – Productor – Editor
• UCAM – LIDERA TU FUTURO 2022
Spot
Director
2021
• ADIÓS NOVIEMBRE – SALTO MORTAL
Videoclip
Director – Productor – Editor
• ADIÓS NOVIEMBRE – ECO
Videoclip
Director – Productor – Editor
• AYOHO FT MARÍA DE JUAN – EL ESPEJO
Videoclip
Director – Productor – Editor
• EL ÚNICO – ZUMO PAL DESAYUNO
Videoclip
Director – Productor – Editor
• CABALLITO DE MAR. POR UN MAR MENOR VIVO
Spot
Co-Director – Guionista - Co-Productor – Editor
2020
• VECINOS
Cortometraje
Director – Co-Guionista – Co-Productor – Editor
• INGLÉS BRITÁNICO
Cortometraje
Director – Co-Guionista – Co-Productor – Editor
• IGNACIO MARTÍN LERMA FT EDU MARTÍNEZ – TU SÉPTIMO ARTE
Videoclip
Co-Director - Co-Productor – Editor
• LA ANTIGÜEDAD TARDÍA. LOS POBLADORES DEL SURESTE
Mediometraje Documental
Director – Guionista
• MUTE
Cortometraje
Primer ayudante de dirección – Editor
• MURCIA. UNA CIUDAD PARA RECORDAR
Publicidad
Director – Guionista
• ÁLVARO BENITO – MI FORTALEZA
Lyric Video
Editor
• HE LLEGADO
Cortometraje
Director – Guionista – Productor – Editor
2019
• LA CASICA DE PAPEL
Cortometraje
Director – Co-Guionista – Productor – Editor
• DENTRO
Cortometraje
Director – Guionista – Productor – Editor
2018
• EL ENCUENTRO
Cortometraje
Director – Guionista
• LONJA
Cortometraje
Director – Guionista – Productor – Editor
2017
• LOS CUATRO DE MR. M
Mediometraje
Director – Guionista – Co-Productor - Editor`;

const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
const filmography = [];
let currentYear = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (/^\d{4}$/.test(line)) {
    currentYear = parseInt(line);
    filmography.push({ year: currentYear, items: [] });
  } else if (line.startsWith('•')) {
    const title = line.substring(1).trim();
    const category = lines[i+1];
    const roles = lines[i+2];
    filmography[filmography.length-1].items.push({
      title,
      category: category || '',
      roles: roles || ''
    });
    i += 2;
  }
}

const targetDir = path.join(__dirname, 'src', 'content', 'filmography');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

filmography.forEach((yearData) => {
  const filename = `${yearData.year}.json`;
  fs.writeFileSync(path.join(targetDir, filename), JSON.stringify(yearData, null, 2));
});

console.log('Filmography files generated successfully.');
