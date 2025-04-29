import './Main.css';
import { assets } from '../../assets/assets';
import { useContext } from 'react';
import { Context } from '../../context/Context';
const Main = () => {

        const {onSend,recentPrompt,showResult,loading,resultData,setInput,input}= useContext(Context);
  return (
    <div className='main'>
<div className="nav">
    <p>Gemini</p>
    <img src={assets.user_icon} alt='user-icon'/>
    </div>   

    <div className="main-container">


        {
            !showResult ? <> 
            <div className="greet">
            <p><span>Hello, Dev.</span></p>
            <p>How can i help you today?</p>
        </div>
        
        <div className="cards">
            <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt='compass'/>
            </div>
            <div className="card">
                <p>Brifly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt='compass'/>
            </div>


            <div className="card">
                <p>Brainstorm team bonding activites for our work retreat</p>
                <img src={assets.message_icon} alt='compass'/>
            </div>


            <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt='compass'/>
            </div>
        </div>
            
            </> : <>
            <div className="result">
                <div className='result-title'>
                    <img src={assets.user_icon} alt=''/>
                    <p>{recentPrompt}</p>
                </div>
                
                <div className='result-data'>
                <img src={assets.gemini_icon}  alt=''/>
                {/* <p dangerouslySetInnerHTML={{__html:resultData}}>{resultData}</p> */}
                {
                    loading ? <>
                    <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                    </div>
                    </>:
                    <>
                     <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                    </>
                }
               

                </div>
            </div>
            </>
        }
        


        <div className="main-bottom">
            <div className="search-box">
                <input onChange={(e)=>setInput(e.target.value)} value={input} type='text' placeholder='Enter a prompt here..' />
                <div>
                    <img src={assets.gallery_icon} alt="" />
                    <img src={assets.mic_icon} alt="" />
                    {input? <img onClick={()=>onSend()} src={assets.send_icon} alt="" /> : null}
                </div>
                </div>
<p className="bottom-info">
Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, esse architecto in error ducimus ut.
</p>
           
        </div>
        </div> 
    </div>
  )
}

export default Main
