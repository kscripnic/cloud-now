import { contextBridge, desktopCapturer, ipcRenderer } from 'electron'
import Peer from 'peerjs'
import {
  keyToggle,
  setKeyboardDelay,
  setMouseDelay,
  mouseToggle,
  moveMouse,
} from 'robotjs'

setKeyboardDelay(0)
setMouseDelay(0)

const keyToggleMap = (value: string, down: 'down' | 'up') => {
  switch (value) {
    case 'Backspace':
    case 'Delete':
    case 'Enter':
    case 'Tab':
    case 'Escape':
    case 'Home':
    case 'End':
    case 'PageUp':
    case 'PageDown':
    case 'Alt':
    case 'Control':
    case 'Shift':
    case 'Space':
      keyToggle(value.toLowerCase(), down)
      break
    case 'ArrowUp':
      keyToggle('up', down)
      break
    case 'ArrowDown':
      keyToggle('down', down)
      break
    case 'ArrowLeft':
      keyToggle('left', down)
      break
    case 'ArrowRight':
      keyToggle('right', down)
      break
    default:
      keyToggle(value, down)
      break
  }
}

export const api = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems.
   *
   * The function below can accessed using `window.Main.sayHello`
   */

  sendMessage: (message: string) => {
    ipcRenderer.send('message', message)
  },

  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data))
  },

  getPeer: async (id: string, sourceId: string) => {
    const peer = new Peer({ debug: 2 })
    try {
      const stream = await (<any>navigator.mediaDevices).getUserMedia({
        audio: {
          mandatory: {
            chromeMediaSource: 'desktop',
          },
        },
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: sourceId,
            minWidth: 1920,
            maxWidth: 1920,
            minHeight: 1080,
            maxHeight: 1080,
            maxFrameRate: 60,
            minFrameRate: 60,
          },
        },
      })
      peer.on('open', () => {
        console.log(`conectando....${id}`)
        peer.call(id, stream)
        const conn = peer.connect(id.trim())
        conn.on('open', function () {
          // Receive messages
          console.log('conectouuu')

          conn.send({ dt: '', type: 'ping' })
          conn.on('data', function (data) {
            switch (data.type) {
              case 'keyUp':
                keyToggleMap(data.key, 'up')
                break
              case 'keyDown':
                keyToggleMap(data.key, 'down')
                break
              case 'mouseDown':
                if (data.key === 0) mouseToggle('down', 'left')
                if (data.key === 1) mouseToggle('down', 'middle')
                if (data.key === 2) mouseToggle('down', 'right')
                break
              case 'mouseUp':
                if (data.key === 0) mouseToggle('up', 'left')
                if (data.key === 1) mouseToggle('up', 'middle')
                if (data.key === 2) mouseToggle('up', 'right')
                break
              case 'mouseMove':
                moveMouse(data.key.x, data.key.y)
                break
              case 'ping':
              default:
                conn.send(data)
                break
            }
          })
        })
      })

      peer.on('error', function (err) {
        console.log(err)
      })
    } catch (e) {
      console.log(e)
    }
  },

  getWindows: async () => {
    const sources = await desktopCapturer.getSources({ types: ['screen'] })
    return sources
  },
}

contextBridge.exposeInMainWorld('Main', api)
