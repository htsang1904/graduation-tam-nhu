export interface InvitationData {
  ownerName: string;
  name: string;
  faculty: string;
  cohort: string;
  displayDate: string;
  displayTime: string;
  startLocal: string;
  endLocal: string;
  timeZone: string;
  venue: string;
  address: string;
  inviteText: string;
  tagline: string;
  mapUrl: string;
  calendar: {
    startUtc: string;
    endUtc: string;
    summary: string;
    description: string;
    location: string;
  };
}

export const INVITATION_DATA: InvitationData = {
  ownerName: "Trần Đắc Tâm Như",
  name: "Lễ tốt nghiệp đại học",
  faculty: "Hàn Quốc học",
  cohort: "K21",
  displayDate: "Thứ Ba, ngày 10/11/2026",
  displayTime: "9h45 – 12h00",
  startLocal: "2026-11-10T09:45:00",
  endLocal: "2026-11-10T12:00:00",
  timeZone: "Asia/Ho_Chi_Minh",
  venue: "Trường Đại học Khoa học Xã hội và Nhân văn, ĐHQG-HCM — cơ sở Linh Xuân",
  address: "Khu phố 33, phường Linh Xuân, TP.HCM",
  inviteText: "Rất mong được đón tiếp bạn tại buổi lễ tốt nghiệp đại học của mình!",
  tagline: "You're Invited!",
  mapUrl:
    process.env.NEXT_PUBLIC_EVENT_MAP_URL ||
    "https://maps.google.com/?q=Trường+Đại+học+Khoa+học+Xã+hội+và+Nhân+văn+ĐHQG-HCM+Cơ+sở+Linh+Trung+Thủ+Đức",
  calendar: {
    startUtc: "20261110T024500Z",
    endUtc: "20261110T050000Z",
    summary: "Lễ Tốt Nghiệp — Trần Đắc Tâm Như (Hàn Quốc học K21)",
    description:
      "Rất mong được đón tiếp bạn tại lễ tốt nghiệp đại học của Trần Đắc Tâm Như tại Trường ĐH KHXH&NV, ĐHQG-HCM (cơ sở Linh Xuân)!",
    location:
      "Trường Đại học Khoa học Xã hội và Nhân văn, ĐHQG-HCM — cơ sở Linh Xuân, Khu phố 33, P. Linh Xuân, TP.HCM",
  },
};
