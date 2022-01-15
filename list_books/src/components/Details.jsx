import React from 'react'
import StarRating from './StarRating'

export default function Details({detailBook,ratingBook,setBooksComplited,setNote,note}) {
    const L_Storage_booksComplited ="BOOKS_COMPLITED";
    let booksComplited = JSON.parse(localStorage.getItem(L_Storage_booksComplited))
    return (
        detailBook?<div>
            <section style={{height:"50vh"}}>
            <article style={{position:"relative"}}>
                <img src={detailBook.imageLinks?.smallThumbnail||""} alt={detailBook.title} />
                {ratingBook == "completed" ?<StarRating book={detailBook} setBooksComplited={setBooksComplited}/>:""}
                <div style={{height:"100%"}}>
                    <h4 style={{color:"black"}}><b>name : {detailBook.title}</b></h4>
                    <h5><b>author :</b> {detailBook.author}</h5>
                    <p style={{backgroundColor:"white",cursor: "auto",overflow:"auto",height:"80%"}}><b>{detailBook.description}</b></p>
                </div>
            </article>
        </section>
        {ratingBook == "completed"?<section>
        <h2>note :</h2>
        <textarea cols="80" rows="10"
        onChange={(evt)=>{
            setNote(evt.target.value)
        }}
        onBlur={(evt)=>{
            booksComplited.find((item,i)=>{
                if (item.id == detailBook.id) {
                    console.log(item.title);
                    detailBook.note = evt.target.value
                    return
                   }
               })
               setBooksComplited(booksComplited)
               localStorage.setItem(L_Storage_booksComplited,JSON.stringify(booksComplited))
        }}
         value={note}></textarea>
        </section>:""}
        </div>:<div><a href='/'></a><h1>choose book for details</h1></div>
    )
}
