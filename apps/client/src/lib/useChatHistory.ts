import { create } from "zustand";

type Message = { message: string; isUser: boolean; isLoading?: boolean };

const useChatHistory = create<{
  history: Message[];
  addMessage(message: Message): void;
  updateLastMessage(message: Partial<Message>): void;
  overrideHistory(history: Message[]): void;
  clearHistory(): void;
}>()(set => ({
  history: [],
  addMessage: (message: Message) =>
    set(state => ({
      history: [...state.history.filter(v => !v.isLoading), message],
    })),
  updateLastMessage: (message: Partial<Message>) =>
    // @ts-ignore
    set(state => {
      const newHistory = [...state.history];
      const recent = newHistory.pop();
      return { history: [...newHistory, { ...recent, ...message }] };
    }),
  overrideHistory: (history: Message[]) => set({ history }),
  clearHistory: () => set({ history: [] }),
}));

export default useChatHistory;
