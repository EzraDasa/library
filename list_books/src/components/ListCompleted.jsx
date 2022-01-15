import { useState,useEffect } from "react";
export default function ListCompleted({setBooksComplited,booksComplited,setDetailBook,setRatingBook}) {
    const L_Storage_booksComplited ="BOOKS_COMPLITED";
    let [local_list,setLocal_list] = useState(JSON.parse(localStorage.getItem(L_Storage_booksComplited)))
    useEffect(()=>{
        setBooksComplited(local_list)
    },[local_list])
    return (
        <div>
            <div>
            <h1>completed list</h1>
            {
           booksComplited.length? booksComplited.map((book,i)=>{
            return(<section  key={i}>
                    <article>
                        <img src={book.imageLinks?.smallThumbnail||""} alt={book.title} />
                        <div style={{width:"75vw"}}>
                            <h4 style={{color:"green"}}><b>name : {book.title}</b></h4>
                            <h5><b>author :</b> {book.author}</h5>
                            <p title="more description" onClick={()=>{
                                setDetailBook(book)
                                setRatingBook("completed")
                                }}>{book.description.slice(0,500)}<b style={{color:"green",fontSize:"125%"}}>...</b></p>
                        </div>
                        <button onClick={()=>{
                            const copyArray = [...booksComplited];
                            copyArray.splice(i,1)
                            setBooksComplited(copyArray)
                            localStorage.setItem(L_Storage_booksComplited,JSON.stringify(copyArray))
                        }}>Delete</button>
                    </article>
                </section>
                )
}):<h2 style={{color:'green'}}>"Go to read"</h2>}
        </div>
        </div>
    )
}
