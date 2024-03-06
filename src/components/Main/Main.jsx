import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const main = () => {

    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context)



  return (
    <div className="main">
        <div className="nav">
            <p>Mr. Gemini</p>
            <img src={assets.user_icon} alt=""/>
        </div>
        <div className="main-container">

            {!showResult
            ?<>
            
                <div className="greet">
                <p><span>Hello, Mr.Gemini</span></p>
                <p>How can I help you today?</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Suggest any place to go on a trip...</p>
                    <img src={assets.compass_icon} alt=""/>
                </div>
                <div className="card">
                    <p>Breifly summarize the concept: Urban Planning</p>
                    <img src={assets.bulb_icon} alt=""/>
                </div>
                <div className="card">
                    <p>Brainstorm team bonding activities for the team</p>
                    <img src={assets.message_icon} alt=""/>
                </div>
                <div className="card">
                    <p>Improve the readability of the following code</p>
                    <img src={assets.code_icon} alt=""/>
                </div>
        </div>

        </>
        :<div className='result'>
            <div className="result-title">
                <img src={assets.user_icon} alt=""/>
                <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
                <img src={assets.gemini_icon} alt="" />
                {loading                                //if loading is true then response isnt generated yet so img remains
                ?<div className='loader'>
                    <hr />
                    <hr />
                    <hr />               
                </div>
                :<p dangerouslySetInnerHTML={{__html:resultData}}></p>//once loading becomes false, display p results
                }
                
            </div>
        </div>
        }


            
            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e)=> setInput(e.target.value)} value={input} type="text" placeholder='Enter your prompt here' />
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        {input?<img onClick={()=>onSent()} src={assets.send_icon} alt="" />:null}
                    </div>
                </div>
                <p className="bottom-info">
                    Troy's Gemini may display inaccurate information, including about people, so double check if its responses
                </p>
            </div>
        </div>

    </div>
  )
}

export default main