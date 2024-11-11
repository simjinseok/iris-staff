import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowUpIcon, ChevronLeftIcon, SearchIcon } from "lucide-react";

export default function ChatDetail() {
  const { chatId } = useParams();

  const [step, setStep] = useState<number>(0);
  const [title, setTitle] = useState("");
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState([]);

  useEffect(() => {
    fetch(`/${chatId}.json`)
      .then((res) => res.json())
      .then((result) => {
        setTitle(result.title);
        setUsers(result.users);
        setChat(result.chat);
      });
  }, [chatId]);

  return (
    <div className="h-full flex flex-col bg-[#B2C8D8]">
      <div className="sticky top-0 py-1 flex justify-between border-b border-gray-300">
        <div>
          <Link to="/">
            <ChevronLeftIcon />
          </Link>
        </div>
        <div className="absolute flex top-0 bottom-0 items-center left-[50%] translate-x-[-50%]">
          <h2 className="text-[20px] font-bold">{title}</h2>
        </div>
        <div>
          <button type="button">
            <SearchIcon />
          </button>
        </div>
      </div>
      <ul className="px-3 py-3 grow flex flex-col gap-1.5">
        {chat
          .filter((d, idx) => idx < step)
          .map((c, idx) => (
            <Content
              key={`content-${c.id}`}
              chat={chat}
              users={users}
              contentObj={c}
              idx={idx}
            />
          ))}
      </ul>
      <div className="sticky bottom-0 px-1 pt-1 pb-1 flex items-center gap-2">
        <input placeholder="다음" className="grow px-3 rounded-[20px]" />
        <button
          type="button"
          className="p-1 rounded-full bg-yellow-400"
          onClick={() => setStep((prev) => prev + 1)}
        >
          <ArrowUpIcon width={16} height={16} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}

function Content({ contentObj, idx, chat, users }) {
  const isContinue = chat[idx - 1]?.userId === contentObj.userId;
  const user = users.find((user) => user.id === contentObj.userId);

  return (
    <li className="pl-12">
      {!isContinue && user && (
        <div className="">
          <img
            src={user.avatarUrl}
            className="-ml-12 absolute w-10 h-10 rounded-full border border-gray-300"
            alt=""
          />
          <p className="text-[14px] text-gray-600">{user.name}</p>
        </div>
      )}
      <p
        className="w-fit max-w-[80%] px-2 py-1 rounded-[12px] bg-white data-[me]:bg-yellow-400 data-[me]:ml-auto whitespace-pre-wrap"
        data-me={contentObj.userId === null ? "" : undefined}
      >
        {contentObj.content}
      </p>
    </li>
  );
}
