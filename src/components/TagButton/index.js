const TagButton = props => {
  const {det, tagClicked} = props
  const {optionId, displayText} = det
  const onClickTag = event => {
    tagClicked(event)
  }
  return (
    <li>
      <button type="button" onClick={onClickTag} value={optionId}>
        {displayText}
      </button>
    </li>
  )
}
export default TagButton
