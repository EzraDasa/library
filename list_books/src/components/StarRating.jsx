import React,{useState,useEffect} from 'react'
import {FaStar} from 'react-icons/fa'

const StarRating = ({book,setBooksComplited}) =>{
    const L_Storage_booksComplited ="BOOKS_COMPLITED";
    let booksComplited = JSON.parse(localStorage.getItem(L_Storage_booksComplited))
    const [rating, setRating] = useState(Number(book.rating));
    return (
        <div style={{display:"flex",position:"absolute",left:"25%",top:"5%"}}>
            {[...Array(5)].map((star,i)=>{
                const ratingValue = i+1
            return(
            <label key={i}>
                <input type="radio" value={book.rating?book.rating:ratingValue} onClick={()=>{
                    setRating(ratingValue)
                    booksComplited.find((item,i)=>{
                     if (item.id == book.id) {
                         booksComplited[i].rating = ratingValue; 
                         return
                        }
                    })
                    setBooksComplited(booksComplited)
                    localStorage.setItem(L_Storage_booksComplited,JSON.stringify(booksComplited))
                    }}/>
                <FaStar className='star' color={ratingValue<= rating ?'#ffc107':'#e4e5e9'} size={20}/>
                </label>
                )
            })}
        </div>
    )
}
export default StarRating