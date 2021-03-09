import "xterm/css/xterm.css"
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import Peer from 'peerjs';

export class PeerTerm {
    constructor({serverPeer = null, peerid=null, domid="terminal"}) {
        this.serverPeer = serverPeer
        this.peerid = peerid
        this.domid = domid
        this.peerOptions = {
            debug: 3,
        }
        this.connOptions = {
            serialization: "binary-utf8",
        }        
    }
    open() {
        this.termID = document.getElementById(this.domid)
        this.term = new Terminal({
            rows: 35,
            fontSize: 22,
            cursorBlink: true,
            bellStyle: "sound",
        })
        const termFit = new FitAddon()
        this.term.loadAddon(termFit)
        this.term.onResize((data) => {
            termFit.fit()
        })
        this.term.loadAddon(new WebLinksAddon());
        this.term.open(this.termID)
        this.peer = new Peer(this.peerid, this.peerOptions)
        console.log("connecting to %s (id=%s)", this.serverPeer, this.peerid)
        this.conn = this.peer.connect(this.serverPeer, this.connOptions);
        this.ready = false
        this.conn.on('open', () => {
            this.ready = true
            console.log("Connection open")
        })
        this.conn.on('error', (err) => {
            console.error("Peer error:", err)
        })
        this.conn.on('data', (data) => {
            console.error("Peer data:", data)
            this.term.write(data)
        })
        this.term.onData((data) => {
            console.log("TERM data", data)
            if (!this.ready) {
                console.warn("peer not connected")
                return
            }
            const raw = new Uint8Array(data)
            this.conn.send(raw)
        })
        this.term.onBinary((data) => {
            console.log("TERM binary", data)
            if (!this.ready) {
                console.warn("peer not connected")
                return
            }
            const buffer = new Uint8Array(data.length);
            for (let i = 0; i < data.length; ++i) {
                buffer[i] = data.charCodeAt(i) & 255;
            }
            this.conn.send(buffer);
        })
    }
    close() {
        if (this.term) {
            this.term.dispose()
        }
        if (this.peer) {
            this.peer.close()
        }
    }

}
