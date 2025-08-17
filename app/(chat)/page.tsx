import { ChatConversation } from "@/components/chat/ChatConversation";

export default async function Page() {
  return (
    <>
      <div className="flex flex-col h-screen max-h-screen overflow-hidden p-2 space-x-2 space-y-2">
        <div className="flex-1 flex w-full min-h-0 overflow-hidden lg:space-x-2">
          <div className="h-full flex-col lg:flex w-full min-h-0">
            <ChatConversation className="flex-1 overflow-hidden" />
          </div>
        </div>
      </div>
    </>
  );
}
