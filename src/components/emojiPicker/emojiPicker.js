import { forwardRef, useRef, useState, useEffect } from "react"
import {data as emojiList} from './data'
import EmojiSearch from "./emojiSearch"
import EmojiButton from "./emojiButton"
import styles from './emojiPicker.module.scss'

export function EmojiPicker(props, inputRef){
    
    const [isOpen, setIsOpen] = useState(false)
    const [emojis, setEmojis] = useState(emojiList)

    const containerRef = useRef(null)

    useEffect(()=>{
        window.addEventListener('click', e =>{
            if (!containerRef.current.contains(e.target)) {
                setIsOpen(false)
                setEmojis(emojiList)
            }
        })
    },[])

    function handleClick(){
        setIsOpen(!isOpen)
    }

    function handleSearch(e){
        const q = e.target.value
        // console.log(q)
        if (!!q) {
            const search = emojiList.filter((emoji) => {
                return(
                 emoji.name.toLowerCase().includes(q) || 
                 emoji.keywords.toLowerCase().includes(q)
                )
            })
            // console.log(search)
            setEmojis(search)
        } else{
            setEmojis(emojiList)
        }

    }
    
    // function EmojiPickerContainer(){
    //     return ( 
    //         function handleSearch(e){
    //             const q = e
        
    //             if (!!q) {
    //                 const search = emojiList.filter((emoji) =>{
    //                     return(
    //                      emoji.name.toLowerCase().includes(q) || 
    //                      emoji.keywords.toLowerCase().includes(q)
    //                      )
    //                 })
    //                 setEmojis(search)
    //             } else{
    //                 setEmojis(emojiList)
    //             }
        
    //         }       
    //     )
    // }

    function handleOnClickEmoji(emoji){
       const cursorPosition = inputRef.current.selectionStart
       const text = inputRef.current.value 
       const prev = text.slice(0, cursorPosition)
       const next = text.slice(cursorPosition)

       inputRef.current.value = prev + emoji.symbol + next
       inputRef.current.selectionStart = cursorPosition + emoji.symbol.length
       inputRef.current.selectionEnd = cursorPosition + emoji.symbol.length
       inputRef.current.focus()
    }

    return(
        <div ref={containerRef} className={styles.inputContainer}>
            <button onClick={handleClick} className={styles.emojiPickerButton}>
                😎
            </button>
            {isOpen ? (
                <div className={styles.emojiPickerContainer}>
                    <EmojiSearch onSearch={handleSearch} />
                    <div className={styles.emojiList}>
                        {emojis.map((emoji) => (
                            <EmojiButton 
                                key={emoji.symbol} 
                                emoji={emoji} 
                                onClick={handleOnClickEmoji} 
                            />
                        ))}
                    </div>
                </div>
            
            ) : (
                ''
            )}
        </div>
    )
}

export default forwardRef(EmojiPicker)