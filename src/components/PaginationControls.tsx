import './PaginationControls.css'

type Props = {
  isFirstPage: boolean
  isLastPage: boolean
  isResults: boolean
  nextAction: () => void
  prevAction: () => void
}

function PaginationControls({
  isFirstPage, isLastPage, isResults, nextAction, prevAction
}: Props) {
  return (
    <div className="controls--pagination">
      <button
        onClick={() => prevAction()}
        disabled={isFirstPage || !isResults}>Previous</button>
      <button
        onClick={() => nextAction()}
        disabled={isLastPage || !isResults}>Next</button>
    </div>
  )
}

export default PaginationControls