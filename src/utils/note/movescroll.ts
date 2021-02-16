

const getScrollBarPosition = () => {
    return document.body.scrollTop || document.documentElement.scrollTop
};

const getScrollBarMax = () => {
  return document.body.scrollMax || document.documentElement.scrollTopMax
}

const moveScrollBar = (pos: number, interval: number) => {
  if (!window.scrollTo) return false
  window.onmousewheel = () => false
  if (document.body.movement) clearTimeout(document.body.movement)
  let currentPos = getScrollBarPosition()

  let dist = 0
  if (currentPos === pos) {
      window.onmousewheel = () => true
      return true
  } else if (currentPos < pos) {
      dist = Math.ceil((pos - currentPos) / 10)
      currentPos += dist
  } else if (currentPos > pos) {
      dist = Math.ceil((currentPos - pos) / 10)
      currentPos -= dist
  }

  const scrTop = getScrollBarPosition()

  window.scrollTo(0, currentPos)

  if (getScrollBarPosition() === scrTop) {
      window.onmousewheel = () => true
      return true
  }

  document.body.movement = setTimeout(function () {
      moveScrollBar(pos, interval)
  }, interval)
};

export default moveScrollBar