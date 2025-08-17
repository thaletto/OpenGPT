import React from "react";
import { Response } from "@/components/ai-elements/response";
import type { UIDataTypes, UIMessagePart, UITools } from "ai";
import { ActionBar } from "@/components/chat/ActionsBar";

type Role = "user" | "system" | "assistant";

interface Props {
  isLastMessage: boolean;
  index: number;
  part: UIMessagePart<UIDataTypes, UITools>;
  role: Role;
  regenerate: () => Promise<void>;
}

export function MessageTypes({
  part,
  isLastMessage,
  index,
  role,
  regenerate,
}: Props) {
  switch (part.type) {
    case "text":
      return (
        <TextMessage
          index={index}
          text={part.text}
          role={role}
          isLastMessage={isLastMessage}
          regenerate={regenerate}
        />
      );
    default:
      return null;
  }
}

function TextMessage({
  index,
  text,
  role,
  isLastMessage,
  regenerate,
}: {
  index: number;
  text: string;
  role: Role;
  isLastMessage: boolean;
  regenerate: () => Promise<void>;
}) {
  return (
    <React.Fragment key={index}>
      <Response>{text}</Response>
      {role === "assistant" && isLastMessage && (
        <ActionBar
          regenerate={regenerate}
          copyContent={text}
          className="mt-1"
        />
      )}
    </React.Fragment>
  );
}
