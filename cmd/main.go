package main

import (
	"log"
	"time"

	"github.com/muka/peer"
	"github.com/rs/xid"
)

func main() {

	opts := peer.NewOptions()
	opts.Token = "peer-ssh"
	opts.Debug = 4
	peer1, err := peer.NewPeer("ssh-host-"+xid.New().String(), opts)
	if err != nil {
		panic(err)
	}
	defer peer1.Close()

	// peer2, err := peer.NewPeer("host2", opts)
	// if err != nil {
	// 	panic(err)
	// }
	// defer peer2.Close()
	// conn1, _ := peer2.Connect("ssh-host-1", peer.NewConnectionOptions())

	peer1.On("error", func(data interface{}) {
		err := data.(error)
		log.Printf("Err %s\n", err)
	})
	peer1.On("connection", func(data interface{}) {
		log.Println("Connected")
		conn := data.(*peer.DataConnection)
		conn.On("data", func(data interface{}) {
			// Will print 'hi!'
			log.Printf("Received: %v\n", data)
		})
		for {
			conn.Send([]byte("# hello!"), false)
			<-time.After(time.Second)
		}
	})

	// client, err := sshclient.DialWithPasswd("pi4:22", "pi", "raspberry")
	// if err != nil {
	// 	panic(err)
	// }
	// defer client.Close()

	// out, err := client.Cmd("tail -n 100  /var/log/dmesg").Output()

	// if err != nil {
	// 	panic(err)
	// }

	// fmt.Println(string(out))

	// for {
	// 	conn1.Send([]byte("Test"), false)
	// 	<-time.After(time.Second)
	// }

	select {}
}
