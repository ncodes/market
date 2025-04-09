import React from "react";
import EmojiAvatar from "./emoji-avatar";

export enum AvatarSize {
  Micro,
  Small,
  Medium,
  Large,
}

export function useAvatar() {
  function generate(randomStr: string, size = AvatarSize.Small) {
    return React.cloneElement(<EmojiAvatar randomStr={randomStr} size={size} />);
  }

  return { generate };
}
