// Personal 45             103(ban) 201 202(ban) 208 301 302 308
// Doble 65                104 203 303
// Doble Familiar 75       207 
// Matrimonial 60          101 102 204 205 304(ban) 305 307 
// Matrimonial Simple 50   105 106
// Triple Familiar 100     206 306

import { Client, DayComment, Pay, Reservation, Room } from "@/generated/prisma/browser";

export const seedOrigins = {
  'Argentina': false,
  'Alemania': false,
  'Australia': false,
  'Belgica': false,
  'Bolivia': false,
  'Brasil': false,
  'Canada': false,
  'Colombia': false,
  'Corea del Sur': false,
  'Costa Rica': false,
  'Chile': false,
  'China': false,
  'Ecuador': false,
  'EEUU': false,
  'España': false,
  'Francia': false,
  'India': false,
  'Israel': false,
  'Italia': false,
  'Japon': false,
  'Mexico': false,
  'Holanda': false,
  'Panama': false,
  'Reino Unido': false,
  'Rusia': false,
  'Suiza': false,
  'Uruguay': false,
  'Venezuela': false,
  'Africa': false,
  'America': false,
  'Asia': false,
  'Europa': false,
  'Oceania': false,

  'Lima Metropolitana': true,
  'Region Lima': true,
  'Amazonas': true,
  'Ancash': true,
  'Apurimac': true,
  'Arequipa': true,
  'Ayacucho': true,
  'Cajamarca': true,
  'Cusco': true,
  'Huancavelica': true,
  'Huanuco': true,
  'Ica': true,
  'Junin': true,
  'La Libertad': true,
  'Lambayeque': true,
  'Loreto': true,
  'Madre de Dios': true,
  'Moquegua': true,
  'Pasco': true,
  'Piura': true,
  'Puno': true,
  'San Martin': true,
  'Tacna': true,
  'Tumbes': true,
  'Ucayali': true,
}

export const seedUsers = [
  {
    name:'Diana',
    lastName: 'Arucutipa',
    email: 'dianaarucutipa@barreto.com',
    password: 'D1@nita_',
  },
  {
    name:'Luz',
    lastName: 'Marina',
    email: 'luzmarina@barreto.com',
    password: 'LuzM@rin4',
  },
  {
    name:'Rossy',
    lastName: 'Arucutipa',
    email: 'rossyaruccutipa@barreto.com',
    password: 'R0$$yta_',
  },
]

export const seedRooms:Omit<Room,'status'>[] = [

  { number: 101, floor: 1, posW: 20, posH: 52, price: 60, type: "Matrimonial",active: true,  },
  { number: 201, floor: 2, posW: 27, posH: 71, price: 45, type: "Personal",active: true,  },
  { number: 301, floor: 3, posW: 27, posH: 71, price: 45, type: "Personal",active: true,  },

  { number: 102, floor: 1, posW: 20, posH: 39, price: 60, type: "Matrimonial",active: true,  },
  { number: 202, floor: 2, posW: 73, posH: 71, price: 45, type: "Personal",active: false,  },
  { number: 302, floor: 3, posW: 73, posH: 71, price: 45, type: "Personal",active: true,  },

  { number: 103, floor: 1, posW: 20, posH: 20, price: 45, type: "Personal",active: false,  },
  { number: 203, floor: 2, posW: 27, posH: 52, price: 65, type: "Doble",active: true,  },
  { number: 303, floor: 3, posW: 27, posH: 52, price: 65, type: "Doble",active: true,  },

  { number: 104, floor: 1, posW: 75, posH: 21, price: 65, type: "Doble",active: true,  },
  { number: 204, floor: 2, posW: 73, posH: 52, price: 60, type: "Matrimonial",active: true,  },
  { number: 304, floor: 3, posW: 73, posH: 52, price: 60, type: "Matrimonial",active: false,  },

  { number: 105, floor: 1, posW: 75, posH: 7,  price: 50, type: "Matrimonial_Simple",active: true,  },
  { number: 205, floor: 2, posW: 27, posH: 39, price: 60, type: "Matrimonial",active: true,  },
  { number: 305, floor: 3, posW: 27, posH: 39, price: 60, type: "Matrimonial",active: true,  },

  { number: 106, floor: 1, posW: 20, posH: 7,  price: 50, type: "Matrimonial_Simple",active: true,  },
  { number: 206, floor: 2, posW: 22, posH: 13, price: 100, type: "Triple_Familiar",active: true,  },
  { number: 306, floor: 3, posW: 22, posH: 13, price: 100, type: "Triple_Familiar",active: true,  },

  { number: 207, floor: 2, posW: 72, posH: 21.5, price:75, type: "Doble_Familiar",active: true,  },
  { number: 307, floor: 3, posW: 72, posH: 21.5, price:60, type: "Matrimonial",active: true, },

  { number: 208, floor: 2, posW: 73, posH: 7, price: 45, type: "Personal",active: true,  },
  { number: 308, floor: 3, posW: 73, posH: 7, price: 45, type: "Personal",active: true,  },
];



export const seedCountries = [
  { id: "PE", flag: "🇵🇪", name: "Peru" },
  { id: "CL", flag: "🇨🇱", name: "Chile" },
  { id: "US", flag: "🇺🇸", name: "Estados Unidos" },
  { id: "EC", flag: "🇪🇨", name: "Ecuador" },
  { id: "BO", flag: "🇧🇴", name: "Bolivia" },
  { id: "BR", flag: "🇧🇷", name: "Brasil" },
  { id: "CO", flag: "🇨🇴", name: "Colombia" },
  { id: "ES", flag: "🇪🇸", name: "España" },
  { id: "AR", flag: "🇦🇷", name: "Argentina" },
{ id: "MX", flag: "🇲🇽", name: "Mexico" },
  { id: "FR", flag: "🇫🇷", name: "Francia" },
  { id: "DE", flag: "🇩🇪", name: "Alemania" },
  { id: "CA", flag: "🇨🇦", name: "Canada" },
];



