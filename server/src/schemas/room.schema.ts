import { z } from 'zod';

export const createRoomSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  furniture: z.array(
    z.object({
      type: z.string(),
      position: z.object({
        x: z.number(),
        y: z.number(),
      }),
      interaction: z.string().optional(),
    })
  ).optional(),
});