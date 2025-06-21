/**
 * Tempo em segundos para dormida da thread.
 * @param timeSec tempo em segundos de dormida
 */
export function SleepSec(timeSec: number) {
  return new Promise((resolve, _) => {
    return setTimeout(resolve, timeSec * 1000);
  });
}

/**
 * Tempo em mSec para dormida da thread.
 * @param timemSec tempo em segundos de dormida
 */
export function SleepmSec(timemSec: number) {
  return new Promise((resolve, _) => {
    return setTimeout(resolve, timemSec);
  });
}
