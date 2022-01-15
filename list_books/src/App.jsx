import { useState, createContext, useEffect } from 'react'
import './App.css'
import LoginOrRegister from './components/LoginOrRegister'
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom'
import Home from './components/Home'
import ListCompleted from './components/ListCompleted'
import ReadingList from './components/ReadingList'
import GetBooks from './components/GetBooks'
import Details from './components/Details'
import StarRating from './components/StarRating'

export const SettingUser = createContext()
export const SetRating = createContext()

function App() {
  const L_Storage_USER = "USER_email";
  const L_Storage_booksReading ="BOOKS_READING";
  const L_Storage_booksComplited ="BOOKS_COMPLITED";
  const checkBooksReading = JSON.parse(localStorage.getItem(L_Storage_USER))
  const [signIn, setSignIn] = useState(checkBooksReading)
  const [ratingBook, setRatingBook] = useState(false)
  const [detailBook, setDetailBook] = useState(null)
  const [arrayBooks, setArrayBooks] = useState([])
  const [booksReading, setBooksReading] = useState([])
  const [booksComplited, setBooksComplited] = useState([])
  const [note, setNote] = useState("");
  
  useEffect(() => {
    if(checkBooksReading){
      setSignIn(checkBooksReading)
      setBooksReading(JSON.parse(localStorage.getItem(L_Storage_booksReading)))
      setBooksComplited(JSON.parse(localStorage.getItem(L_Storage_booksComplited)))
      setTimeout(() => {
        setSignIn(false)
        localStorage.setItem(L_Storage_USER,JSON.stringify(false))
    }, 1000*60*20);
    }
    GetBooks({ setArrayBooks })
  },[])

  return (
    <div className="App">
      <BrowserRouter>
        {signIn.status == 200  ? (
          <>
          <button onClick={()=>{
            setSignIn(false)
            localStorage.setItem(L_Storage_USER,JSON.stringify(false))
            }}>log out</button>
            <Link to="/" onClick={()=>{setDetailBook(null);setRatingBook(null)}}>Home</Link>
            <Link to="/reading" onClick={()=>setDetailBook(null)}>Reading List</Link>
            <Link to="/completed" onClick={()=>setDetailBook(null)}>List Completed</Link>
            <Link to="/details" ></Link>
            <Switch>
              <Route exact path="/" render={() => <Home   arrayBooks={arrayBooks} setBooksReading={setBooksReading} booksReading={booksReading} setDetailBook={setDetailBook}/>}/>
              <Route exact path="/details" render={() => <Details detailBook={detailBook} ratingBook={ratingBook} setBooksComplited={setBooksComplited} setNote={setNote} note={note}/>}/>
              <Route exact path="/completed" render={() => <ListCompleted setBooksComplited={setBooksComplited} booksComplited={booksComplited} setBooksReading={setBooksReading} booksReading={booksReading} setDetailBook={setDetailBook} setRatingBook={setRatingBook}/>} />
              <Route exact path="/reading" render={() => <ReadingList setBooksReading={setBooksReading} booksReading={booksReading} setBooksComplited={setBooksComplited} booksComplited={booksComplited} setDetailBook={setDetailBook} detailBook={detailBook} setRatingBook={setRatingBook}/>} />
            </Switch>
            {detailBook?<Redirect to="/details" detailBook={detailBook} ratingBook={ratingBook} setNote={setNote} note={note}/>:""}
          </>
        ) : (
          <SettingUser.Provider value={setSignIn}>
            <Redirect to="/" />
            <LoginOrRegister setSignIn={setSignIn} />
          </SettingUser.Provider>
        )}
      </BrowserRouter>
      {signIn.status == 400?<h2>Error : check your email or code</h2>:""}
    </div>
  )
}
export default App
