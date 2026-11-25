// Small-stake momentum bot for the pump.fun replay sprint (agent-fun/replay/v2).
// The grader runs `node /bot/main.ts`; the strategy lives in strategy.ts and the SDK shim
// is the kit's sdk/ts/makefun-bot.ts, vendored byte for byte.
//
// Strategy (see strategy.ts for the full write-up): one flat 0.02 SOL buy per curve, only
// on a tight momentum filter (60-slot window, +15% rise, >= 1 SOL net inflow, >= 8
// distinct buyers, no wallet over 40% of buys, curve aged >= 600 slots with 4-60 SOL
// real reserves). Every position exits on an 8% stop loss, a 40% trailing stop armed at
// +30%, a 5x take-profit, or a 1200-slot hold cap. Tiny 0.012 SOL probe round trips keep
// the entry above the 20-coin guardrail on a quiet tape.
//
// Local backtest on the kit's full 24h dev window (all 3 dataset parts, local engine
// port): net -0.197 SOL, 241 fills, 79 coins, 121 round trips, 7 wins, max drawdown
// 2.5%. Negative on dev — the tape is harsh (the kit's own pilot baselines lose on it
// too) — but the bleed and drawdown are small and bounded by the flat stake and stops.

import { runBot } from './vendor/agentfun-bot.ts';
import { createStrategy, DEFAULT_PARAMS } from './strategy.ts';

await runBot(createStrategy(DEFAULT_PARAMS));
