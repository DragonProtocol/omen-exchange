/*
 * @Author: bufan
 * @Date: 2021-09-30 22:06:07
 * @LastEditors: bufan
 * @LastEditTime: 2021-09-30 22:41:40
 * @Description: file content
 */
const BSC_MAX_GET_LOGS_NUM = 5000
export async function getBSCLogs(provider: any, filter: any, from: number, to: number): Promise<any[]> {
  const logs = []
  // eslint-disable-next-line no-console
  // console.info('getBSCLogs', from, to)
  while (from < to) {
    if (to - from > BSC_MAX_GET_LOGS_NUM) {
      logs.push(
        await provider.getLogs({
          ...filter,
          fromBlock: from,
          toBlock: Math.min(from + BSC_MAX_GET_LOGS_NUM, to),
        }),
      )
    }
  }
  return logs
}
