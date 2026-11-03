import { EVENT_CONFIG } from "@/config/event";

function escapeIcsText(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

export function generateIcsContent(): string {
  const { calendar, hostName } = EVENT_CONFIG;
  const nowUtc = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Tam Nhu Graduation Invitation//VI",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:graduation-${EVENT_CONFIG.calendar.startUtc}-${encodeURIComponent(hostName)}@tamnhu.graduation`,
    `DTSTAMP:${nowUtc}`,
    `DTSTART:${calendar.startUtc}`,
    `DTEND:${calendar.endUtc}`,
    `SUMMARY:${escapeIcsText(calendar.summary)}`,
    `DESCRIPTION:${escapeIcsText(calendar.description)}`,
    `LOCATION:${escapeIcsText(calendar.location)}`,
    "STATUS:CONFIRMED",
    "TRANSP:OPAQUE",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.join("\r\n");
}

export function downloadCalendarEvent(): void {
  const icsData = generateIcsContent();
  const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "le-tot-nghiep-tam-nhu.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
