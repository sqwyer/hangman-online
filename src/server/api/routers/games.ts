import { z } from "zod";
import { createGame, generateCode } from "../../games";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const gamesRouter = createTRPCRouter({
  createGame: publicProcedure
    .input(z.object({
        host: z.string(),
        word: z.string()
    }))
    .query(({ input }) => {
        const [game, code] = createGame({
            code: generateCode(),
            host: input.host,
            word: input.word,
            users: []
        });
        return { game, code }
    })
});
