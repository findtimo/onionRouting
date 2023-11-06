import React from 'react'
import './App.css'
import firebase from 'firebase/app'
import 'firebase/database'
import config from './config'
import { Button } from '@mantine/core'

class Connector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isCorrect: true,
      statusMsg: `You received a message: "Zcl Bmtcp".\nEnter to join`,
      database: null,
      isConnected: false,
      myId: '',
      receiverId: 'receiverId1',
      message: '',
      messages: [],
      layer: 4,
    }
  }

  componentDidMount = async () => {
    firebase.initializeApp(config)

    this.setState({
      database: firebase.database()
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.database !== nextState.database) {
      return false
    }

    return true
  }

  connect = async () => {
    try {
      const { database, myId } = this.state

      await database.ref('/notifs/' + myId).remove()

      await database.ref('/notifs/' + myId).on('value', snapshot => {
        if (snapshot.exists()) {
          const notif = snapshot.val()
          this.setState({
            messages: [...this.state.messages, notif]
          })
        }
      })
      this.setState({
        isConnected: true
      })
      this.checkMessage()
    } catch (e) {
      console.error(e)
    }
  }

  checkMessage = () => {
    const msg = this.state.message
    if (this.state.layer === 4) {
      this.sendMessage()
      this.state.layer = 3;
    }
    else if (this.state.layer === 3) {
      if (msg === "Zcl Bmtcp") {
        console.log("yes")
        this.setState({ isCorrect: false, statusMsg: `You received a message: "Zcl Bmtcp".\nEnter to join` });
      } else {
        this.setState({ isCorrect: true, statusMsg: `You received a message: "Zcl Bmtcp".\nEnter to join` })
      }
    }
    else if (this.state.layer === 2) {
      if (this.state.message === "Ehq Gryhu") {
        this.setState({ isCorrect: false, statusMsg: "Successfully peeled off layer" });
      } else {
        this.setState({ isCorrect: true, statusMsg: "Wrong try again" })
      }
    }
    else if (this.state.layer === 1) {
      if (this.state.message === "Mpy Ozgpc") {
        this.setState({ isCorrect: false, statusMsg: "Successfully peeled off layer" });
      } else {
        this.setState({ isCorrect: true, statusMsg: "Wrong try again" })
      }
    }
    else if (this.state.layer === 0) {
      if (this.state.message === "Ben Dover") {
        this.setState({ isCorrect: false, statusMsg: "Successfully peeled off layer" });
      } else {
        this.setState({ isCorrect: true, statusMsg: "Wrong try again" })
      }
    }

  }

  sendMessage = async () => {
    try {
      const { database, receiverId, myId, layer } = this.state
      await database.ref('/notifs/' + receiverId).set({
        // message,
        from: myId,
        layer: layer,
      })
      this.setState({
        message: '',
        statusMsg: `You received a message: "Zcl Bmtcp".\nEnter to join`,
        isCorrect: true,
        layer: layer - 1
      })
    } catch (e) {
      console.error(e)
    }
  }

  renderMessage = (value, key) => {
    return <div key={key}>
      <h4>Message from {value.from}: {value.message}</h4>
    </div>
  }

  render() {
    console.log(this.state.layer)
    return <div>
      {this.state.isConnected ? (
        this.state.layer >= 0 ? (
          <div style={{ width: '100%' }}>
          {/* <img src="Tor-Emblem.png" alt="Onion Routing Logo" width="150" height="150"/> */}
          <center><h1>Onion Routing App</h1></center>
            <center><div>
            <h2 style={{ paddingTop: '15px' }}>{this.state.statusMsg}</h2>
            <input
              placeholder='Send the deciphered message'
              value={this.state.message}
              onChange={(e) => {
                this.setState({ message: e.target.value }, () => {
                  this.checkMessage();
                });
              }}
            />
            <Button disabled={this.state.isCorrect} onClick={this.sendMessage}>
              Send
            </Button>
            {/* <div>
              Received messages: {this.state.messages.map(this.renderMessage)}
            </div> */}

            <span  style={{ paddingTop: '4rem' }}><br />This message uses a ROT13 sub cipher, you'll need to rotate each word by x steps,<br /> can you do it within the time limit!!?!</span>
            <div  style={{ paddingTop: '5rem' }}>
              {this.state.layer === 4 ? (
                <img src="1use1.png" width="150" height="150" />
              ) : (
                <img src="use1.png" width="120" height="120" />
              )}
              <img style={{ paddingLeft: '10px', paddingRight: '10px' }} src="arrow.png" width="70" height="50" />
              
              {this.state.layer === 3 ? (
                <div>
                <img src="1use2.png" width="150" height="150" />
                <span>Zcl Bmtcp</span>
                </div>
              ) : (
                <img src="use2.png" width="120" height="120" />
              )}
              <img style={{ paddingLeft: '10px', paddingRight: '10px' }} src="arrow.png" width="70" height="50" />
              
              {this.state.layer === 2 ? (
                <div>
                <img src="1use3.png" width="150" height="150" />
                <span>Ehq Gryhu</span>
                </div>
              ) : (
                <img src="use3.png" width="120" height="120" />
              )}
              <img style={{ paddingLeft: '10px', paddingRight: '10px' }} src="arrow.png" width="70" height="50" />
              
              {this.state.layer === 1 ? (
                <div>
                <img src="1use4.png" width="150" height="150" />
                <span>Mpy Ozgpc</span>
                </div>
              ) : (
                <img src="use4.png" width="120" height="120" />
              )}
              <img style={{ paddingLeft: '10px', paddingRight: '10px' }} src="arrow.png" width="70" height="50" />
              
              {this.state.layer === 0 ? (
                <div>
                <img src="1use5.png" width="150" height="150" />
                <span>Ben Dover</span>
                </div>
              ) : (
                <img src="use5.png" width="120" height="120" />
              )}
            </div>
          </div>
          </center>
          </div>
        ) : (
          <div>
            <h1 style={{ paddingTop: '20px' }}>"Ben Dover"</h1>
            <h2>Congratulations {this.state.myId}!</h2>
          </div>
        )
      ) : (
        <div>
          <center>
            <img src="Tor-Emblem.png" alt="Onion Routing Logo" width="150" height="150"/>
            <h1>Onion Routing App</h1>
            <h2>Join as a node in our onion routing network</h2>
          </center>
          <h3>What is your ID:</h3>
          <input
            value={this.state.myId}
            onChange={(e) => this.setState({ myId: e.target.value })}
          />
          <Button onClick={this.connect}>Connect</Button>
        </div>
      )}
    </div>
  }
}

export default Connector
