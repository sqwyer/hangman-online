import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createGame, findGame, generateCode, updateGame } from "../../games";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const gamesRouter = createTRPCRouter({
  createGame: publicProcedure
    .input(z.object({
        host: z.string(),
        word: z.string(),
        name: z.string(),
    }))
    .query(({ input }) => {
        const [game, code] = createGame({
            code: generateCode(),
            host: input.host,
            word: input.word,
            users: [{
                id: input.host,
                name: input.name
            }]
        });
        return { game, code }
    }),
  joinGame: publicProcedure
    .input(z.object({
        id: z.string(),
        name: z.string().trim(),
        code: z.string()
    }))
    .query(({ input }) => {
        const game = findGame(input.code);
        if(game != null) {
            game?.users.push({
                id: input.id,
                name: input.name
            });
            updateGame(input.code, game);
        }
        else {
            throw new TRPCError({code: "BAD_REQUEST"});
        }
    }),
  findGame: publicProcedure
    .input(z.string())
    .query(({input}) => {
        const game = findGame(input);
        if(game != null) return {game}
        else return {game: null}
    })
});

