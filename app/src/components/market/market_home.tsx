import React from 'react'
import styled from 'styled-components'

import { MarketWithExtraData, MarketFilters } from '../../util/types'
import { RemoteData } from '../../util/remote_data'
import { FullLoading } from '../common/full_loading'
import { ListCard } from '../common/list_card'
import { ListItem } from '../common/list_item'
import { SectionTitle } from '../common/section_title'
import { Filter } from '../common/filter'
import { ConnectedWeb3Context } from '../../hooks/connectedWeb3'

const FilterStyled = styled(Filter)`
  margin: -30px auto 10px;
  max-width: ${props => props.theme.list.maxWidth};
  width: 100%;
`

interface Props {
  markets: RemoteData<MarketWithExtraData[]>
  context: ConnectedWeb3Context
  currentFilter: MarketFilters
  onFilterChange: (filter: MarketFilters) => void
}

export const MarketHome: React.FC<Props> = (props: Props) => {
  const { markets, context, currentFilter, onFilterChange } = props
  const options = [MarketFilters.AllMarkets, MarketFilters.MyMarkets, MarketFilters.FundedMarkets]

  return (
    <>
      <SectionTitle title={'MARKETS'} />
      {context.account && (
        <FilterStyled
          defaultOption={currentFilter}
          options={options}
          onChange={({ value }: { value: MarketFilters }) => onFilterChange(value)}
        />
      )}
      <ListCard>
        {RemoteData.is.success(markets)
          ? markets.data.map((item, index) => {
              return <ListItem key={index} data={item}></ListItem>
            })
          : null}
      </ListCard>
      {RemoteData.is.loading(markets) ? <FullLoading message="Loading markets..." /> : null}
    </>
  )
}
