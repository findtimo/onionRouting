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
      statusMsg: `He dropped a message: "Zcl Bmtcp". Send it to start`,
      database: null,
      isConnected: false,
      myId: '',
      receiverId: 'receiverId1',
      message: '',
      messages: [],
      layer: 4,
      steps: 21,
      code: 'None',
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
      this.setState({ steps: `21` });
      if (msg === "Zcl Bmtcp") {
        console.log("yes")
        this.setState({ isCorrect: false, statusMsg: `He dropped a message: "Zcl Bmtcp". Send it to start` });
      } else {
        this.setState({ isCorrect: true, statusMsg: `He dropped a message: "Zcl Bmtcp". Send it to start` })
      }
    }
    else if (this.state.layer === 2) {
      this.setState({ steps: `18` });
      this.setState({ code: `Zcl Bmtcp` });
      if (this.state.message === "Ehq Gryhu") {
        this.setState({ isCorrect: false, statusMsg: `Successfully peeled off first layer. Continue!` });
      } else {
        this.setState({ isCorrect: true, statusMsg: `Successfully peeled off first layer. Continue!` })
      }
    }
    else if (this.state.layer === 1) {
      this.setState({ steps: `11` });
      this.setState({ code: `Ehq Gryhu` });
      if (this.state.message === "Mpy Ozgpc") {
        this.setState({ isCorrect: false, statusMsg: `Successfully peeled off second layer. Continue!` });
      } else {
        this.setState({ isCorrect: true, statusMsg: `Successfully peeled off second layer. Continue!` })
      }
    }
    else if (this.state.layer === 0) {
      this.setState({ code: `Mpy Ozgpc` });
      if (this.state.message === "Ben Dover") {
        this.setState({ isCorrect: false, statusMsg: `Successfully peeled off last layer. One more!` });
      } else {
        this.setState({ isCorrect: true, statusMsg: `Successfully peeled off last layer. One more!` })
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
        statusMsg: `He dropped a message: "Zcl Bmtcp". Send it to start`,
        isCorrect: true,
        layer: layer - 1
      })
    } catch (e) {
      console.error(e)
    }
    this.checkMessage();
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
          <center><h1>Decipher the Message, Find the Killer!</h1></center>
            <center><div>
            <h2 style={{ paddingTop: '15px' }}>{this.state.statusMsg}</h2>
            <span  style={{  }}>This message uses a ROT13 sub cipher, you'll need to rotate this word by {this.state.steps} steps,<br /> can you do it within the time limit!!?!<br/><br/></span>
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
            <span><br/><br/>Previously deciphered: {this.state.code}</span>
            <div  style={{ paddingTop: '5rem' }}>
              {this.state.layer === 4 ? (
                <img src="1use1.png" width="150" height="150" />
              ) : (
                <img src="use1.png" width="120" height="120" />
              )}
              <img style={{ paddingLeft: '10px', paddingRight: '10px' }} src="arrow.png" width="70" height="50" />
              
              {this.state.layer === 3 ? (
                <img src="1use2.png" width="150" height="150" />
              ) : (
                <img src="use2.png" width="120" height="120" />
              )}
              <img style={{ paddingLeft: '10px', paddingRight: '10px' }} src="arrow.png" width="70" height="50" />
              
              {this.state.layer === 2 ? (
                <img src="1use3.png" width="150" height="150" />
              ) : (
                <img src="use3.png" width="120" height="120" />
              )}
              <img style={{ paddingLeft: '10px', paddingRight: '10px' }} src="arrow.png" width="70" height="50" />
              
              {this.state.layer === 1 ? (
                <img src="1use4.png" width="150" height="150" />
              ) : (
                <img src="use4.png" width="120" height="120" />
              )}
              <img style={{ paddingLeft: '10px', paddingRight: '10px' }} src="arrow.png" width="70" height="50" />
              
              {this.state.layer === 0 ? (
                <img src="1use5.png" width="150" height="150" />
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
