import { GalleryPhoto, RundownItem, RsvpEntry } from '../types';

export const EVENT_DETAILS = {
  title: 'Arisan & Silaturahmi Keluarga Barista',
  subtitle: 'Merajut Kehangatan, Menjaga Tali Persaudaraan',
  hostName: 'sasasjak',
  address: 'sasaasa',
  fullAddress: 'digidaw',
  dateFormatted: 'Rabu, 4 November 2026',
  timeFormatted: '11:00 WIB s/d Selesai',
  eventTimestamp: new Date('2026-11-04T11:00:00+07:00').getTime(),
  whatsappNumber: '621211218473',
  displayPhone: '+62 999219221',
  dresscode: 'Nuansa Maroon / Earthy / Bebas Rapi & Sopan',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=',
};

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-1',
    src: '/assets/aistudio/',
    title: 'Keceriaan Momen Hajatan Keluarga',
    description: 'Senyum hangat ibu-ibu dan keluarga barista dalam balutan busana aneka warna yang semarak.',
    category: 'gathering',
    aspectRatio: '4/3',
  },
  {
    id: 'photo-2',
    src: '/assets/aistudio/image_2ce6e033.png',
    title: 'Sesi Nongkrong & Arisan di Kafe',
    description: 'Pose ceria bersama di bawah lampion hangat dengan canda tawa keluarga barista tercinta.',
    category: 'gathering',
    aspectRatio: '16/9',
  },
  {
    id: 'photo-3',
    src: '/assets/aistudio/image_0fa601eb.png',
    title: 'Silaturahmi di Kediaman Hangat',
    description: 'Kumpul akrab di teras dan ruang keluarga, saling berpelukan dan mengabadikan foto bersama.',
    category: 'silaturahmi',
    aspectRatio: '3/4',
    defaultRotate: 90, // image was rotated sideways, offer upright viewing
  },
  {
    id: 'photo-4',
    src: '/assets/aistudio/image_044ff9e9.png',
    title: 'Kompak Seragam Maroon & Gold',
    description: 'Potret elegan keluarga barista dengan dresscode merah marun dan jilbab keemasan.',
    category: 'outdoors',
    aspectRatio: '16/9',
  },
  {
    id: 'photo-5',
    src: '/assets/aistudio/image_b6ddbe79.png',
    title: 'Potret Wajah Ceria & Penuh Kasih',
    description: 'Selfie kebersamaan penuh senyuman yang merekatkan keakraban antar generasi.',
    category: 'outdoors',
    aspectRatio: '4/3',
  },
];

export const RUNDOWN_ITEMS: RundownItem[] = [
  {
    time: '11:00 - 11:30 WIB',
    title: 'Penyambutan & Registrasi Tamu',
    description: 'Kedatangan keluarga besar di kediaman D Mmh Adam / Mamik Digital, ramah tamah hangat dan welcome drink.',
    iconName: 'Users',
  },
  {
    time: '11:30 - 12:00 WIB',
    title: 'Pembukaan & Doa Bersama',
    description: 'Prakata perwakilan tuan rumah, pembacaan doa syukur atas kesehatan dan rezeki keluarga besar.',
    iconName: 'HeartHandshake',
  },
  {
    time: '12:00 - 13:00 WIB',
    title: 'Pengocokan Arisan Barista & Santap Siang',
    description: 'Momen pengocokan nomor arisan periode ini dan makan siang prasmanan lezat bersama keluarga.',
    iconName: 'Sparkles',
  },
  {
    time: '13:00 - 14:00 WIB',
    title: 'Sajian Kopi Barista Spesial & Ramah Tamah',
    description: 'Menikmati racikan kopi barista hangat dan dingin istimewa sambil bercengkerama akrab.',
    iconName: 'Coffee',
  },
  {
    time: '14:00 WIB - Selesai',
    title: 'Sesi Foto Bersama & Penutup',
    description: 'Mengabadikan kenangan keluarga generasi arisan barista dan saling berpamitan dengan penuh kehangatan.',
    iconName: 'Camera',
  },
];

export const INITIAL_GUESTBOOK: RsvpEntry[] = [
  {
    id: 'msg-1',
    name: 'Keluarga Bude Ani & Pakde Joko',
    status: 'hadir',
    guestCount: 3,
    message: 'Alhamdulillah insyaAllah hadir sekeluarga. Semoga acara arisan keluarga barista lancar, berkah, dan semua sehat selalu!',
    createdAt: '2026-11-01T08:30:00Z',
  },
  {
    id: 'msg-2',
    name: 'Tante Rina & Om Dimas',
    status: 'hadir',
    guestCount: 2,
    message: 'InsyaAllah pasti hadir ke kediaman Mamik & Adam. Tak sabar mencicipi seduhan kopi hangatnya sambil bercengkerama!',
    createdAt: '2026-11-02T10:15:00Z',
  },
  {
    id: 'msg-3',
    name: 'Kak Fila & Rombongan',
    status: 'hadir',
    guestCount: 4,
    message: 'Bismillah siap hadir meramaikan arisan keluarga. Semoga tali silaturahmi kita semakin erat dan membawa keberkahan.',
    createdAt: '2026-11-02T14:45:00Z',
  },
];
