import { z } from "zod";

export const rsvpSchema = z
  .object({
    guestName: z
      .string()
      .trim()
      .min(2, "Vui lòng nhập tên có ít nhất 2 ký tự")
      .max(80, "Tên không được vượt quá 80 ký tự"),
    attendance: z.enum(["yes", "no"], {
      message: "Vui lòng chọn bạn có tham dự hay không",
    }),
    companions: z
      .number()
      .int()
      .min(0, "Số người đi cùng tối thiểu là 0")
      .max(5, "Số người đi cùng tối đa là 5"),
    message: z
      .string()
      .max(500, "Lời nhắn tối đa 500 ký tự")
      .optional()
      .default(""),
    website_hp: z.string().optional().default(""), // Honeypot field
  })
  .transform((data) => {
    // If attendance is 'no', companions must always be 0
    return {
      ...data,
      companions: data.attendance === "no" ? 0 : data.companions,
    };
  });

export type RSVPInput = z.infer<typeof rsvpSchema>;
