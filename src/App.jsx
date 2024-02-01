import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function App() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [photo, setPhoto] = useState(null);
    const [users, setUsers] = useState([
        {
            name: "Akbarkhon",
            number: "+998948684850",
            photo: "./r.jpeg",
            delIcon: false,
            messageList: []
        }
    ]);
    const [delIcon, setDelIcon] = useState(false);
    const [userIndex, setUserIndex] = useState(-1);
    const [messageText, setMessageText] = useState("")
    const [searchText, setSearchText] = useState("");
    const [messageInd, setMessageInd] = useState(-1);


    const getInputUserPhoto = (event) => {
        const {target: {files}} = event;
        const file = files[0];

        function getBase64(file) {
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = function () {
                setPhoto(reader.result);
            };

            reader.onerror = function () {
                setPhoto(null);
            };
        }

        getBase64(file);

    };

    const addUser = () => {
        let NewUser = {
            name,
            number,
            photo,
            delIcon,
            messageList: []
        };

        let NewArr = users.concat(NewUser);
        setUsers(NewArr)

        setName("")
        setNumber("")
        setPhoto(null)

    };

    const showDelIcon = (ind) => {
        users[ind].delIcon = !users[ind].delIcon

        let NewArr = [...users];
        setUsers(NewArr)
    };

    const delUser = (index) => {
        users.splice(index, 1)
        let NewArr = [...users]
        setUsers(NewArr)
    };

    const addMessage = () => {

        let d = new Date();
        d = (d.getHours() < 10 ? "0" + d.getHours() : d.getHours()) + ":" + (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes());

        let newMessage = {
            text: messageText,
            time: d
        };

        let newList = users.map((item, index) => {
            if (index === userIndex) {
                item.messageList = Array.from(item.messageList).concat(newMessage)
            }
            return item

        })
        setUsers(newList)
        setMessageText("")
    };

    const delMessage = (ind) => {
        users[userIndex].messageList.splice(ind, 1);
        let newArr = [...users];
        setUsers(newArr)
    };

    const editMessage = () => {
        users[userIndex].messageList[messageInd].text = messageText
        let newArr = [...users]
        setUsers(newArr)

        setMessageInd(-1);
        setMessageText("")
    };



    return (
        <div className="main-container">
            <div className="left-side">
                <div className="header-side">
                    <input onChange={(e) => setSearchText(e.target.value)} placeholder="search" type="text"/>
                    <div onClick={handleShow} className="add-btn"><img src="./add-user.png" alt=""/></div>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add contact</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <input onChange={(e) => setName(e.target.value)} placeholder="Name" className="form-control"
                                   type="text"/>

                            <input onChange={(e) => setNumber(e.target.value)} placeholder="Number"
                                   className="form-control my-3" type="text"/>

                            <input onChange={getInputUserPhoto} placeholder="Name" className="form-control"
                                   type="file"/>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => {
                                handleClose();
                                addUser();
                            }}>
                                ADD Contact
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div className="body-side">
                    {
                        users.filter((item) => {

                            return searchText.toLowerCase() === "" ? item :

                                item.name.toLowerCase().includes(searchText)

                        }).map((item, index) => {

                            return <div>    
                                <div key={index} className="user" onDoubleClick={() => showDelIcon(index)}
                                     onClick={() => setUserIndex(index)}>
                                    <div className="image">
                                        {
                                            (item.photo === undefined) ? <h1>{item.name.slice(0,1)} </h1> : <>
                                            <img src={item.photo} alt=""/>
                                            {console.log(item.photo)}
                                            </>
                                        }
                                    </div>

                                    <div className="text">
                                        <div className="name">{item.name}</div>
                                        <div className="number">{item.number}</div>
                                    </div>

                                    <div onClick={() => delUser(index)}
                                         className={item.delIcon ? "del-icon-show" : "del-icon-hide"}>
                                        <img className='icon' src="./delete.png" alt=""/>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className="right-side">
                {
                    userIndex >= 0 && users.length !=0  ? <>
                        <div className="header">
                            <div className="image">
                                <img src={users[userIndex].photo} alt=""/>
                            </div>

                            <div className="text">
                                <div className="name">{users[userIndex].name}</div>
                                <div className="number">{users[userIndex].number}</div>
                            </div>
                        </div>

                        <div className="body">

                            <div>
                                {users[userIndex].messageList.map((item, index) => {
                                    return <div key={index} className="message">
                                        <div className="text">
                                            <div onClick={() => delMessage(index)} className="del-message">
                                                <img src="./delete.png" alt="" />
                                            </div>
                                            <div onClick={() => {
                                                setMessageText(item.text)
                                                setMessageInd(index)
                                            }
                                            } className="edit-message">E
                                            </div>
                                            {item.text}
                                        </div>

                                        {/* <div onClick={() => delUser(index)}
                                            className={item.delIcon ? "del-icon-show2" : "del-icon-hide"}>
                                            <img className='icon' src="./delete.png" alt=""/>
                                        </div> */}
                                    </div>
                                })}
                            </div>

                        </div>

                        <div className="footer">
                            <div className='footer-input'>
                                <input placeholder='Text a message' onChange={(e) => setMessageText(e.target.value)} value={messageText}
                                    className="form-control w-75 "
                                    type="text"/>
                            {
                                messageInd >= 0 ?
                                    <div onClick={editMessage} className="btn btn-warning w-25 ">Edit</div> :
                                    <div onClick={addMessage} className="btn btn-success w-25 ">Send</div>
                            }
                                {/* <img onClick={addMessage} src="./send-button.png" alt="" /> */}
                            </div>
                        </div>
                    </> : ""
                }

            </div>
        </div>
    );
}

export default App;