"use client";

import { DEFAULT_MODEL, TEST_PROMPTS } from "@/ai/constants";
import { LogIn, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel, PanelHeader } from "@/components/layout/panels";
import { toast } from "sonner";
import { useChat } from "@ai-sdk/react";
import { useEffect, useState } from "react";
import { LogoIpsum } from "../icons/logoipsum";
import { useSidebar } from "../ui/sidebar";
import { useSession } from "../providers/session-provider";
import { useRouter } from "next/navigation";
import { useMessageToken } from "@/hooks/use-message-token";
import { encryptSessionToken, isEncryptedToken } from "@/lib/utils";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolOutput,
  ToolInput,
} from "@/components/ai-elements/tool";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { getSupportedModels } from "@/functions/models";
import type { AvailableModel } from "@/types/models";
import { PromptInputBox } from "./PromptInputBox";
import { MessageTypes } from "./MessageTypes";

interface Props {
  className: string;
  modelId?: string;
}

export function ChatConversation({ className }: Props) {
  const [modelId, setModelId] = useState(DEFAULT_MODEL);
  const { token, count, increment, unLockMessaging } = useMessageToken();
  const session = useSession();
  const router = useRouter();
  const [input, setInput] = useState("");
  const { toggleSidebar } = useSidebar();
  const { messages, sendMessage, setMessages, status, regenerate } = useChat({
    onError: (error) => {
      toast.error(`Communication error with the AI`);
      console.error("Error sending message:", error);
    },
  });

  function validateAndSubmitMessage(text: string) {
    if (!text.trim()) return;

    const isGuestToken = token && !isEncryptedToken(token);

    // Guest Mode
    if (!session && count >= 3 && isGuestToken) {
      toast.info("Please log in to send more message");
      return;
    }

    sendMessage({ text }, { body: { modelId } });
    setInput("");

    if (!session) increment();
  }

  useEffect(() => {
    if (session) {
      unLockMessaging(encryptSessionToken(session));
    }
  }, [session]);

  function goToLogin() {
    router.push("/login");
  }

  useEffect(() => {
    const onNewChat = () => setMessages([]);
    window.addEventListener("new-chat", onNewChat);
    return () => window.removeEventListener("new-chat", onNewChat);
  }, [setMessages]);

  const [models, setModels] = useState<AvailableModel[]>([]);

  useEffect(() => {
    async function fetchModels() {
      try {
        const result = await getSupportedModels();
        setModels(result.models);
      } catch (err) {
        console.error("Failed to fetch models:", err);
      }
    }
    fetchModels();
  }, []);

  return (
    <Panel className={className}>
      <PanelHeader className="h-12 bg-background">
        <div className="flex flex-row items-start gap-2 font-semibold">
          <PanelLeft
            size={20}
            onClick={toggleSidebar}
            className="block md:hidden"
          />
          <div className="hidden md:flex flex-row justify-center items-center gap-1 text-primary">
            <LogoIpsum />
            <span>OpenGPT</span>
          </div>
        </div>

        {!session?.session.token && (
          <Button
            type="button"
            onClick={goToLogin}
            className="ml-auto cursor-pointer"
          >
            <LogIn />
            Login
          </Button>
        )}
      </PanelHeader>

      <Conversation className="flex flex-col flex-1 justify-center items-center overflow-hidden">
        {messages.length === 0 && (
          <div className="flex md:hidden flex-row w-full h-full justify-center items-end">
            <div className="flex flex-row items-center gap-1 text-2xl text-primary">
              <LogoIpsum />
              <span>OpenGPT</span>
            </div>
          </div>
        )}
        <ConversationContent className="flex-1 max-w-4xl mx-auto overflow-y-auto">
          {messages.map((message, messageIndex) => {
            const isLastMessage = messageIndex === messages.length - 1;
            return (
              <Message from={message.role} key={messageIndex}>
                <MessageContent>
                  {message.parts.map((part, i) => (
                    <MessageTypes
                      part={part}
                      key={i}
                      index={i}
                      isLastMessage={isLastMessage}
                      role={message.role}
                      regenerate={regenerate}
                    />
                  ))}
                </MessageContent>
              </Message>
            );
          })}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <PromptInputBox
        handleSubmit={() => validateAndSubmitMessage(input)}
        input={input}
        setInput={setInput}
        modelId={modelId}
        setModelId={setModelId}
        models={models}
        status={status}
        className="my-2 mx-auto max-w-sm md:max-w-xl lg:max-w-4xl rounded-xl border border-border"
      />
    </Panel>
  );
}
