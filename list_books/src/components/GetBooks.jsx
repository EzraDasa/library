import axios from 'axios'
export default function GetBooks({setArrayBooks}) {
    function getArrayBooks() {
    axios('./data.json')
    .then((res)=>{
        setArrayBooks(res.data.items)
        return true
    })
    .catch((err)=>console.log(err)) 
    }
    getArrayBooks()
    return false
}
