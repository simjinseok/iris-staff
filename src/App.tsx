import React, { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ChatDetail from "./chat/[:chatId]";

export default function App() {
  const [step, setStep] = useState<number>(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat/:chatId" element={<ChatDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <div>
      <p>광고영역</p>
      <ul className="px-3">
          <li className="py-2">
              <Link to={"/chat/1"} className="flex items-start gap-3">
                  <img src="https://avatar.iran.liara.run/public/boy?username=john" alt=""
                       className="w-12 h-12 rounded-full border border-gray-100"/>
                  <div className="grow">
                      <p className="font-semibold">소개남</p>
                      <p className="text-[14px] text-gray-400">다음 주에 시간 괜찮으시면 영화 어떠세요?</p>
                  </div>
                  <p className="text-[12px] text-gray-400">오후 1:23</p>
              </Link>
          </li>

          <li className="py-2">
              <Link to={"/chat/2"} className="flex items-start gap-3">
                  <img src="https://avatar.iran.liara.run/public/girl?username=olivia" alt=""
                       className="w-12 h-12 rounded-full border border-gray-100"/>
                  <div className="grow">
                      <p className="font-semibold">나영희</p>
                      <p className="text-[14px] text-gray-400">건강챙겨야지ㅇㅇㅋ</p>
                  </div>
                  <p className="text-[12px] text-gray-400">오후 1:23</p>
              </Link>
          </li>
      </ul>
    </div>
  );
}
