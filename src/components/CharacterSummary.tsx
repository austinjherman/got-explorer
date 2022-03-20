import { Character } from '../api-asoiaf/types'

type Props = {
  data: Character|null
}

function CharacterSummary({ data }: Props) {
  if (!data) return null
  return (
    <div className="data-table-summary">
      <div>
        <strong>Name:</strong> {data.name || 'unknown'}
      </div>
      <div>
        <strong>Aliases:</strong> {data.aliases.join(', ') || 'unknown'}
      </div>
    </div>
  )
}

export default CharacterSummary