/*
 * @Author: bufan
 * @Date: 2021-09-18 15:19:21
 * @LastEditors: bufan
 * @LastEditTime: 2021-09-27 10:41:14
 * @Description: file content
 */
declare module '3box'
declare module '3box-comments-react'
declare module '@react-corekit/use-interval'
declare module '@realitio/realitio-lib/formatters/question'
declare module '@realitio/realitio-lib/formatters/template'
declare module '@walletconnect/web3-subprovider'
declare module 'apollo-link-logger'
declare module 'react-draggable'
declare module 'react-share'

declare type Maybe<T> = T | null

declare type KnownToken =
  | 'cdai'
  | 'wbtc'
  | 'stake'
  | 'cbat'
  | 'ceth'
  | 'cusdc'
  | 'cusdt'
  | 'cwbtc'
  | 'cuni'
  | 'usdc'
  | 'dai'
  | 'weth'
  | 'owl'
  | 'chai'
  | 'gno'
  | 'pnk'
  | 'dxd'
  | 'wspoa'
  | 'wxdai'
  | 'omn'
  | 'wbnb'

declare type KnownArbitrator = 'kleros' | 'dxdao' | 'unknown'
