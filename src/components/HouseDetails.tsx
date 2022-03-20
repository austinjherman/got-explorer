import { House } from '../api-asoiaf/types'

import DataTableItemDetail from './DataTableItemDetails'

type Props = {
  data: House
}

function HouseDetails({ data }: Props) {

  const details = {
    name: data.name,
    region: data.region,
    coatOfArms: data.coatOfArms,
    words: data.words,
    titles: data.titles.join(', '),
    seats: data.seats.join(', '),
    founded: data.founded,
    diedOut: data.diedOut,
    ancestralWeapons: data.ancestralWeapons.join(', ')
  }

  return (
    <DataTableItemDetail detail={details} />
  )

}

export default HouseDetails