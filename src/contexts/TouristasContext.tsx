import { createContext, useContext, useState, ReactNode } from 'react';

interface TouristasContextType {
    isOpen: boolean;
    openChat: (prompt?: string) => void;
    closeChat: () => void;
    initialPrompt: string | null;
}

const TouristasContext = createContext<TouristasContextType | null>(null);

export function TouristasProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [initialPrompt, setInitialPrompt] = useState<string | null>(null);

    const openChat = (prompt?: string) => {
        if (prompt) setInitialPrompt(prompt);
        setIsOpen(true);
    };

    const closeChat = () => {
        setIsOpen(false);
        setInitialPrompt(null);
    };

    return (
        <TouristasContext.Provider value={{ isOpen, openChat, closeChat, initialPrompt }}>
            {children}
        </TouristasContext.Provider>
    );
}

export function useTouristas() {
    const context = useContext(TouristasContext);
    if (!context) {
        throw new Error('useTouristas must be used within a TouristasProvider');
    }
    return context;
}
