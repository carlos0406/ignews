import { useEffect, useState } from 'react'

export function Async() {
  const [buttonVisible, setbuttonVisible] = useState(false)
  const [buttonInvisible, setbuttonInvisible] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setbuttonVisible(true)
      setbuttonInvisible(true)
    }, 1000)
  }, [])
  return (
    <div>
      <div>Async</div>
      {buttonVisible && <button>Teste</button>}
      {!buttonInvisible && <button>Teste2</button>}
    </div>
  )
}
