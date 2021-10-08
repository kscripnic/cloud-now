import { contextBridge, desktopCapturer, ipcRenderer } from 'electron'
import Peer from 'peerjs'
import { keyToggle } from 'robotjs'

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
                keyToggle(data.key, 'up')
                break
              case 'keyDown':
                keyToggle(data.key, 'down')
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
