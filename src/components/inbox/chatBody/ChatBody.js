import React from "react";
import { useParams } from "react-router-dom";
import ChatHead from "./ChatHead";
import Messages from "./Messages";
import Options from "./Options";
import Error from "../../ui/Error";
import { useGetMessagesQuery } from "../../../features/messages/messagesApi";

const ChatBody = () => {
  const { id } = useParams();
  const { data: messages, isLoading, isError, error } = useGetMessagesQuery(id);

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (!isLoading && isError) {
    content = (
      <div>
        <Error message={error?.data} />
      </div>
    );
  } else if (!isLoading && !isError && messages?.length === 0) {
    content = <div>No messages found</div>;
  } else if (!isLoading && !isError && messages?.length > 0) {
    content = (
      <>
        <ChatHead message={messages[0]} />
        <Messages messages={messages} />
        <Options info={messages[0]} />
      </>
    );
  }

  return (
    <div className="w-full lg:col-span-3 lg:block ">
      <div className="grid conversation-row-grid  bg-secondary  mx-6 rounded-xl">{content}</div>
    </div>
  );
};

export default ChatBody;
