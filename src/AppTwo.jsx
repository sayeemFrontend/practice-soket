import { useEffect, useRef, useState } from "react"
import io from "socket.io-client"
import Peer from "simple-peer"
import { CopyToClipboard } from "react-copy-to-clipboard"
// import "/App.css"
const socket = io.connect("htpp://localhost:5000")



const AppTwo = () => {
    const [me, setMe] = useState("")
    const [stream, setStream] = useState()
    const [receivingCall, setReceivingCall] = useState(false)
    const [caller, setCaller] = useState("")
    const [callerSignal, setCallerSignal] = useState()
    const [callAccepted, setCallAccepted] = useState(false)
    const [idToCall, setIdToCall] = useState(false)
    const [callEnded, setCallEnded] = useState(false)
    const [name, setName] = useState("")
    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            setStream(stream)
            myVideo.current.srcObject = stream
        })

        socket.on("me", (id) => {
            setMe(id)
        })

        socket.on("callUser", (data) => {
            setReceivingCall(true)
            setCaller(data.from)
            setName(data.name)
            setCallerSignal(data.signal)
        })

    }, [])

    const callUser = (id) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream

        })
        peer.on("signal", (data) => {
            socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: me,
                name: name
            })
        })

        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream
        })

        socket.on("callAccepted", (signal) => {
            setCallAccepted(true)
            peer.signal(signal)
        })

        connectionRef.current = peer
    }

    const answerCall = () => {
        setCallAccepted(true)
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        })
        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream
        })
        peer.signal(callerSignal)
        connectionRef.current = peer

    }
    const leaveCall = () => {
        setCallEnded(true)
        connectionRef.current.destroy()
    }

    return (
        <div className="container">
            <div className="video-container mt-5">
                <div className="video">
                    {stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
                </div>
                <div className="video">
                    {callAccepted && !callEnded ? <video playsInline ref={userVideo} autoPlay style={{ width: "300px" }} />
                        : null}
                </div>
            </div>
            <div className="myId">
                <input id="filled-base" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} style={{ marginBottom: "20px" }} />

                <CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
                    <button className="btn btn-lg btn-primary">Copy ID</button>
                </CopyToClipboard>
                <input id="filled-base" value={idToCall} placeholder="Id to Call" onChange={(e) => setIdToCall(e.target.value)} style={{ marginBottom: "20px" }} />
                <div className="call-button">
                    {callAccepted && !callEnded ? <button className="btn btn-primary" onClick={leaveCall} >
                        end Call</button> : <button className="btn btn-sm btn-secondary" onClick={() => callUser(idToCall)}>
                        call</button>}
                    {idToCall}
                </div>

            </div>

            {receivingCall && !callAccepted ? <div className="caller">
                <h1>{name} is calling...</h1>
                <button className="btn btn-md btn-primary" onClick={answerCall}>Answer</button>

            </div> : null}
        </div>
    );
}

export default AppTwo;