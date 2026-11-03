export interface RSVPFormData {
  guestName: string;
  attendance: "yes" | "no";
  companions: number;
  message?: string;
  website_hp?: string; // Honeypot field for bots (should remain empty)
}

export interface RSVPDocument {
  id?: string;
  guestName: string;
  attendance: "yes" | "no";
  companions: number;
  message: string;
  createdAt?: string; // Formatted or ISO string for client
}

export interface RSVPStats {
  total: number;
  yesCount: number;
  noCount: number;
  totalAttendees: number; // yesCount + total companions from 'yes' responses
}
