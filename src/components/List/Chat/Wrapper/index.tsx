import { useRef } from 'react';
import { AskInput, Messages } from 'components';

const ChatMsg = () => {
  const scrollRef = useRef<null | HTMLDivElement>(null);
  return (
    <div className="flex flex-col justify-between">
      {' '}
      <div ref={scrollRef} className="h-[650px] overflow-y-scroll flex flex-col">
        <Messages />
      </div>
      <AskInput />
    </div>
  );
};

export default ChatMsg;
