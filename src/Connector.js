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
      statusMsg: '',
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
      this.state.layer = 3;
    }
    else if (this.state.layer === 3) {
      console.log(msg + " " + "Zcl Bmtcp");
      if (msg === "Zcl Bmtcp") {
        console.log("yes")
        this.setState({ isCorrect: false, statusMsg: "Successfully peeled off layer" });
      } else {
        this.setState({ isCorrect: true, statusMsg: "Wrong try again" })
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
        statusMsg: '',
        isCorrect: true,
        layer: layer-1
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
    return <div>
      {this.state.isConnected ? (
        this.state.layer >= 0 ? (
          <div>
            <div>Status: {this.state.statusMsg}</div>
            <h3>Send a message:</h3>
            <input 
              placeholder='your message'
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
            <div>
              Received messages: {this.state.messages.map(this.renderMessage)}
            </div>

            <h2>temp: Zcl Bmtcp, Ehq Gryhu, Mpy Ozgpc, Ben Dover</h2>
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
