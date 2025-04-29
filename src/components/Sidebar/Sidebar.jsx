import React, { useState, useContext } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const { onSend,newChat, previewsPrompt = [], setRecentPrompt } = useContext(Context);
  const [extended, setExtended] = useState(false);


  const loadPrompt = async(prompt)=>{
    setRecentPrompt(prompt);
    await onSend(prompt);
  }

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtended(prev => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="menu-icon"
        />

        <div onClick={()=>newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="plus" />
          {extended && <p>New Chat</p>}
        </div>

        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {previewsPrompt.length > 0 ? (
              previewsPrompt.map((item, index) => (
                <div key={index} onClick={()=>loadPrompt(item)} className="recent-entry">
                  <img
                    className="message-image"
                    src={assets.message_icon}
                    alt="message"
                  />
                  <p>{item.slice(0,18)}...</p>
                </div>
              ))
            ) : (
              <p className="no-recent">No recent prompts</p>
            )}
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="question" />
          {extended && <p>Help</p>}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="history" />
          {extended && <p>Activity</p>}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="setting" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
