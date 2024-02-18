import { create } from "zustand";

type Message = { message: string; isUser: boolean; isLoading?: boolean };

const useChatHistory = create<{
  history: Message[];
  addMessage(message: Message): void;
  updateLastMessage(message: Message): void;
  overrideHistory(history: Message[]): void;
  clearHistory(): void;
}>()(set => ({
  history: [],
  addMessage: (message: Message) =>
    set(state => ({
      history: [...state.history, message],
    })),
  updateLastMessage: (message: Message) =>
    set(state => {
      state.history.pop();
      return { history: [...state.history, message] };
    }),
  overrideHistory: (history: Message[]) => set({ history }),
  clearHistory: () => set({ history: [] }),
}));

export default useChatHistory;
