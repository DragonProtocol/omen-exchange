/*
 * @Author: bufan
 * @Date: 2021-09-18 15:19:22
 * @LastEditors: bufan
 * @LastEditTime: 2021-09-27 10:39:37
 * @Description: file content
 */
import { utils } from 'ethers'
import { BigNumber } from 'ethers/utils'

import { wBNBabi, wETHabi, wsPOAabi, wxDaiabi } from '../abi/wrapped_asset'

class UnwrapTokenService {
  static withdrawAmount = (symbol: string, amount: BigNumber): string => {
    const contractABI = UnwrapTokenService.getABI(symbol)
    const withdrawInterface = new utils.Interface(contractABI)
    return withdrawInterface.functions.withdraw.encode([amount.toString()])
  }

  static getABI = (symbol: string) => {
    const symbolLowerCase = symbol.toLowerCase()
    switch (symbolLowerCase) {
      case 'wbnb':
        return wBNBabi
      case 'wxdai':
        return wxDaiabi
      case 'wspoa':
        return wsPOAabi
      case 'weth':
        return wETHabi
      default:
        return []
    }
  }
}

export { UnwrapTokenService }
