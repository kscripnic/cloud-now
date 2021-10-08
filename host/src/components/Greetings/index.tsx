import { DesktopCapturerSource } from 'electron'
import { useState, useEffect } from 'react'
import { Container } from './styles'

export function Greetings() {
  const [peerId, setPeerId] = useState('f5e0f2a2-19ed-42bd-8b70-2c033eacc9c6')
  const [windowId, setWindowId] = useState('')
  const [windows, setWindows] = useState<Array<DesktopCapturerSource>>([])

  const getWindows = async () => {
    const newWindows = await window.Main.getWindows()
    setWindows(newWindows)
    setWindowId(newWindows ? newWindows[0].id : '')
  }

  useEffect(() => {
    getWindows()
  }, [])

  return (
    <Container>
      <input
        value={peerId}
        onChange={e => setPeerId(e.target.value)}
        placeholder="peerId"
      />
      <input
        value={windowId}
        onChange={e => setWindowId(e.target.value)}
        placeholder="WindowId"
        // onKeyDown={e => console.log(e.key)}
      />
      <button onClick={() => window.Main.getPeer(peerId, windowId)}>
        Conectar
      </button>

      {windows.map(item => (
        <span key={item.id}>{`${item.id} ${item.name}`}</span>
      ))}
    </Container>
  )
}
