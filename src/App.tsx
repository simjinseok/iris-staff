import { format } from "date-fns/format";
import { clsx } from "clsx";

import React, { useState } from "react";
import { ArrowUpIcon, ChevronLeftIcon, SearchIcon } from "lucide-react";

export default function App() {
  const [step, setStep] = useState<number>(0);

  return (
    <div className="h-full flex flex-col bg-[#B2C8D8]">
      <div className="sticky top-0 py-1 flex justify-between border-b border-gray-300">
        <div>
          <button type="button">
            <ChevronLeftIcon />
          </button>
        </div>
        <div className="absolute flex top-0 bottom-0 items-center left-[50%] translate-x-[-50%]">
          <h2 className="text-[20px] font-bold">소개남</h2>
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
            <Content key={`content-${c.id}`} contentObj={c} idx={idx} />
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

function Content({ contentObj, idx }) {
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
        className="w-fit px-2 py-1 rounded-[12px] bg-white data-[me]:bg-yellow-400 data-[me]:ml-auto"
        data-me={contentObj.userId === null ? "" : undefined}
      >
        {contentObj.content}
      </p>
    </li>
  );
}
const users = [
  {
    id: 1,
    name: "홍길동",
    avatarUrl: "https://avatar.iran.liara.run/public/boy?username=john",
  },
  {
    id: 2,
    name: "https://avatar.iran.liara.run/public/boy?username=jessi",
  },
];

const chat = [
  {
    id: 1,
    userId: null,
    content: "잘 들어가셨어요?",
    date: "2024-10-24 23:01:22",
  },
  {
    id: 2,
    userId: 1,
    content: "네ㅎㅎ",
    date: "2024-10-24 23:01:23",
  },
  {
    id: 3,
    userId: 1,
    content: "방금 집 도착했어요",
    date: "2024-10-24 23:01:23",
  },
  {
    id: 4,
    userId: null,
    content: "오늘 정말 즐거웠어요",
    date: "2024-10-24 23:01:23",
  },
  {
    id: 5,
    userId: null,
    content: "다음 주에 시간 괜찮으시면 영화 어떠세요?",
    date: "2024-10-24 23:01:24",
  },
];
