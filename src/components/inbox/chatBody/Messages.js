import React from "react";
import { useSelector } from "react-redux";
import Message from "./Message";

const Messages = ({ messages = [] }) => {
  const { user } = useSelector((state) => state.auth);
  const { email } = user || {};

  return (
    <div className="relative w-full p-6 overflow-y-auto flex flex-col-reverse scrollbar-thin  scrollbar-thumb-[#001529] scrollbar-track-slate-500">
      <ul className="space-y-2">
        {messages
          .slice()
          .sort((a, b) => a.timestamp - b.timestamp)
          .map((message) => {
            const { message: lastMessage, id, sender } = message || {};

            const justify = sender?.email !== email ? "start" : "end";

            return <Message key={id} justify={justify} message={lastMessage} />;
          })}
      </ul>
    </div>
  );
};

export default Messages;
