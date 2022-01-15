import React,{useState ,useEffect,useRef} from 'react'
import './css/library.module.css'
import { SpinnerCircularFixed } from 'spinners-react'

export default function Home({arrayBooks,setBooksReading,booksReading,setDetailBook}) {
    const L_Storage_booksReading ="BOOKS_READING";
    const [search,setSearch] = useState([])
    const [moreBooks,setMoreBooks] = useState(10)
    const [loading,setLoading] = useState(false)
    const inputRef = useRef("")
    useEffect(()=>{
        setDetailBook(null)
        setSearch(arrayBooks)
    },[arrayBooks])
    return (
        <div >
            <h1>books list</h1>
            <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
                <div className='formSearch'>
                    <input ref={inputRef} className='search' type="text" placeholder='Search'/>
                    <button className='searchBtn' type='button'
                    onClick={(evt)=>{
                        setLoading(true)
                        evt.preventDefault()
                        if(inputRef && (inputRef != " ")){
                            const csearchBooks = arrayBooks.filter((book)=>{
                                if(book.volumeInfo.title.toLowerCase().indexOf(inputRef.current.value) != -1){
                                return book;
                            } 
                         })
                         if(csearchBooks){
                             setSearch(csearchBooks)
                         }
                         setLoading(false)
                        }
                    }}>Go</button>
                </div>
            </div>
            {
            search.length?search.map((book,i)=>{
                if(i<moreBooks){
            return(<section  key={book.volumeInfo.id}>
                    <article>
                        <img src={book.volumeInfo.imageLinks?.smallThumbnail||""} alt={book.volumeInfo.title} />
                        <div style={{width:"75vw"}}>
                            <h4><b>name :</b> {book.volumeInfo.title}</h4>
                            <h5><b>author :</b> {book.volumeInfo.author}</h5>
                            <p title="more description" onClick={()=>{setDetailBook(book.volumeInfo)}}>{book.volumeInfo.description.slice(0,500)}<b style={{color:"green",fontSize:"125%"}}>...</b></p>
                        </div>
                        <button onClick={()=>{
                            const copyArray = [...booksReading];
                            const isExist = copyArray.find((item,i)=>item.id == book.volumeInfo.id)
                            if (!isExist) {
                                copyArray.push(book.volumeInfo)
                                setBooksReading(copyArray)
                                localStorage.setItem(L_Storage_booksReading,JSON.stringify(copyArray))
                            }
                        }}>read</button>
                    </article>
                </section>
                )}
}):<h1 style={{marginTop:"2%"}}>Sorry, does not exist ...</h1>}
    {moreBooks<search.length?<button onClick={()=>setMoreBooks(moreBooks+10)} >More books</button>:""}
    {moreBooks<search.length?<button onClick={()=>setMoreBooks(search.length)} >See all books</button>:""}
    {loading?<SpinnerCircularFixed/>:""}
        </div>
    )
}
