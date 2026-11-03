export type AttendanceStatus = 'hadir' | 'ragu' | 'tidak';

export interface RsvpEntry {
  id: string;
  name: string;
  status: AttendanceStatus;
  guestCount: number;
  message: string;
  createdAt: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  description: string;
  category: 'gathering' | 'silaturahmi' | 'outdoors';
  aspectRatio: string;
  defaultRotate?: number; // e.g. 90 deg for rotated photo
}

export interface RundownItem {
  time: string;
  title: string;
  description: string;
  iconName: string;
}
