import { Chat } from "@/components/chat/chat";
import { TabContent } from "@/components/tabs";

export default async function Page() {
  return (
    <>
      <div className="flex flex-col h-screen max-h-screen overflow-hidden p-2 space-x-2 space-y-2">
        <div className="flex-1 flex w-full min-h-0 overflow-hidden lg:space-x-2">
          <TabContent
            className="h-full flex-col lg:flex w-full min-h-0"
            tabId="chat"
          >
            <Chat className="flex-1 overflow-hidden" />
          </TabContent>
        </div>
      </div>
    </>
  );
}
