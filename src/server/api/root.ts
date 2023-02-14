import { createTRPCRouter } from "./trpc";
import { gamesRouter } from "./routers/games";

export const appRouter = createTRPCRouter({
  games: gamesRouter,
});

export type AppRouter = typeof appRouter;
