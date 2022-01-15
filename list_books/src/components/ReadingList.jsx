
export default function ReadingList({setBooksReading,booksReading,setBooksComplited,booksComplited,setDetailBook,setRatingBook}) {
    const L_Storage_booksReading ="BOOKS_READING";
    const L_Storage_booksComplited ="BOOKS_COMPLITED";
    
    return (
            <div>
            <h1>reading list</h1>
            {
           booksReading.length? booksReading.map((book,i)=>{
            return(<section  key={i}>
                    <article>
                        <img src={book.imageLinks?.smallThumbnail||""} alt={book.title} />
                        <div style={{width:"75vw"}}>
                            <h4 style={{color:"green"}}><b>name : {book.title}</b></h4>
                            <h5><b>author :</b> {book.author}</h5>
                            <p title="more description" onClick={()=>{
                                setDetailBook(book)
                                setRatingBook("reading")
                                }}>{book.description.slice(0,500)}<b title='more description' style={{color:"green",fontSize:"125%"}}>...</b></p>
                        </div>
                        <button onClick={()=>{
                            const copyBooksReading = [...booksReading];
                            copyBooksReading.splice(i,1)
                            setBooksReading(copyBooksReading)
                            localStorage.setItem(L_Storage_booksReading,JSON.stringify(copyBooksReading))
                        }}>remove</button>
                        <button onClick={()=>{
                            console.log(i);
                            const copyBooksComplited = [...booksComplited];
                            copyBooksComplited.push(book)
                            setBooksComplited(copyBooksComplited)
                            localStorage.setItem(L_Storage_booksComplited,JSON.stringify(copyBooksComplited))
                            const copyBooksReading = [...booksReading];
                            copyBooksReading.splice(i,1)
                            setBooksReading(copyBooksReading)
                            localStorage.setItem(L_Storage_booksReading,JSON.stringify(copyBooksReading))
                        }}>coplited</button>
                    </article>
                </section>
                )
}):<h2 style={{color:'green'}} >"Go to read"</h2>}
        </div>
    )
}
