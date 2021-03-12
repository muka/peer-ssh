import { PeerTerm } from "../src/peer_term"

const pterm = new PeerTerm()

const peerID = document.getElementById("peerID")
peerID.addEventListener("keypress", (ev) => {

    if (ev.code == "Enter") {

        if (pterm) {
            pterm.close()
        }

        console.log("Connecting to %s", peerID.value)

        pterm.open(peerID.value)

        ev.preventDefault()
    }

})