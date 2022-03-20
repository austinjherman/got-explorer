import { useEffect, useState } from 'react'
import { getHouseByID, getIDFromAPIURL } from '../api-asoiaf'
import { Character } from '../api-asoiaf/types'

import DataTableItemDetail from './DataTableItemDetails'

type Props = {
  data: Character
}

function CharacterDetails({ data }: Props) {

  const [details, setDetails] = useState<Record<string,string>>({
    name: data.name,
    gender: data.gender,
    culture: data.culture,
    born: data.born,
    died: data.died,
    titles: data.titles.join(', '),
    aliases: data.aliases.join(', '),
    allegiances: '',
    tvSeries: data.tvSeries.join(', '),
    playedBy: data.playedBy.join(', '),
  })

  useEffect(() => {
    async function getAllegiances() {
      const allegiances = await Promise.all(
        data.allegiances.map(async (url) => {
          const a = await getHouseByID(getIDFromAPIURL(url))
          return a.data?.name || 'unknown'
        })
      )
      setDetails(prevDetails => ({ ...prevDetails, allegiances: allegiances.join(', ') }))
    }
    if (data.allegiances.length) {
      getAllegiances()
    }
  }, [data.allegiances])

  return (
    <DataTableItemDetail detail={details} />
  )

}

export default CharacterDetails