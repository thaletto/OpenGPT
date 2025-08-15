import { Chat } from "@/components/chat/chat";
import { TabItem, TabContent, TabGroup } from "@/components/tabs";
import { Welcome } from "@/components/modals/welcome";
import { cookies } from "next/headers";
import { hideBanner } from "@/functions/actions";

export default async function Page() {
  const store = await cookies();
  const banner = store.get("banner-hidden")?.value !== "true";
  return (
    <>
      <Welcome defaultOpen={banner} onDismissAction={hideBanner} />
      <div className="flex flex-col h-screen max-h-screen overflow-hidden p-2 space-x-2 space-y-2">
        <ul className="flex space-x-5 lg:hidden text-sm tracking-tight mt-1.5 px-1">
          <TabItem tabId="chat">Chat</TabItem>
        </ul>
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
