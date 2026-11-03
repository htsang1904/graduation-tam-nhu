export interface EventConfig {
  title: string;
  hostName: string;
  major: string;
  cohort: string;
  dateDisplay: string;
  timeDisplay: string;
  locationName: string;
  locationAddress: string;
  invitationQuote: string;
  tagline: string;
  mapUrl: string;
  calendar: {
    startUtc: string; // ISO / UTC format: 20261110T024500Z
    endUtc: string;   // ISO / UTC format: 20261110T050000Z
    summary: string;
    description: string;
    location: string;
  };
}

export const EVENT_CONFIG: EventConfig = {
  title: "Thư mời tốt nghiệp",
  hostName: "Trần Đắc Tâm Như",
  major: "Hàn Quốc học",
  cohort: "K21",
  dateDisplay: "Thứ Ba, 10/11/2026",
  timeDisplay: "09:45 – 12:00",
  locationName: "Trường Đại học Khoa học Xã hội và Nhân văn, ĐHQG-HCM — cơ sở Linh Xuân",
  locationAddress: "Khu phố 33, phường Linh Xuân, TP. Thủ Đức, TP.HCM",
  invitationQuote: "Rất mong được đón tiếp bạn tại buổi lễ tốt nghiệp đại học của mình!",
  tagline: "You're Invited!",
  mapUrl: process.env.NEXT_PUBLIC_EVENT_MAP_URL || "https://maps.google.com/?q=Trường+Đại+học+Khoa+học+Xã+hội+và+Nhân+văn+ĐHQG-HCM+Cơ+sở+Linh+Trung+Thủ+Đức",
  calendar: {
    startUtc: "20261110T024500Z",
    endUtc: "20261110T050000Z",
    summary: "Lễ Tốt Nghiệp — Trần Đắc Tâm Như (K21 Hàn Quốc học)",
    description: "Lễ tốt nghiệp đại học của Trần Đắc Tâm Như tại Trường ĐH KHXH&NV, ĐHQG-HCM (cơ sở Linh Xuân). Rất mong được đón tiếp bạn!",
    location: "Trường Đại học Khoa học Xã hội và Nhân văn, ĐHQG-HCM — cơ sở Linh Xuân, Khu phố 33, P. Linh Xuân, TP.HCM",
  },
};
