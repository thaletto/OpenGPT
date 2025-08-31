import { ChatConversation } from "@/components/chat/ChatConversation";
import { GithubIcon } from "@/components/icons/githubicon";
import { LogoIpsum } from "@/components/icons/logoipsum";
import { Panel, PanelHeader } from "@/components/layout/panels";
import { Button } from "@/components/ui/button";
import { LogIn, PanelLeft, Plus } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { dispatchNewChat } from "@/lib/chat-events";
import { NewChatButton } from "@/components/chat/NewChatButton";

export default async function Page() {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  return (
    <>
      <div className="flex flex-col h-screen max-h-screen overflow-hidden space-x-2 space-y-2">
        <div className="flex-1 flex w-full min-h-0 overflow-hidden lg:space-x-2">
          <div className="h-full flex-col lg:flex w-full min-h-0">
            <Panel className="flex-1 overflow-hidden">
              <PanelHeader className="h-12 flex flex-row justify-between bg-background">
                <div className="flex flex-row justify-between gap-2 font-semibold">
                  <PanelLeft size={20} className="block md:hidden" />
                  <div className="hidden md:flex flex-row justify-center items-center gap-2 text-primary">
                    <LogoIpsum />
                    <span>OpenGPT</span>
                  </div>
                </div>

                <div className="flex flex-row items-center gap-1">
                  <NewChatButton />

                  <Button
                    type="button"
                    variant="ghost"
                    className="cursor-pointer"
                    asChild
                  >
                    <Link
                      href="https://www.github.com/thaletto/OpenGPT"
                      about="Link to GitHub repository"
                      target="_blank"
                    >
                      <GithubIcon />
                    </Link>
                  </Button>

                  {!session?.session.token && (
                    <Button type="button" variant="outline" asChild>
                      <Link href="/login">
                        <LogIn />
                        <span className="hidden md:block">Login</span>
                      </Link>
                    </Button>
                  )}
                </div>
              </PanelHeader>
              <ChatConversation />
            </Panel>
          </div>
        </div>
      </div>
    </>
  );
}
