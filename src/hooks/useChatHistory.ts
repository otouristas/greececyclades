import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth';

export interface ChatConversation {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
  is_saved: boolean;
  metadata: Record<string, any>;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
  metadata: Record<string, any>;
}

export function useChatHistory() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<ChatConversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all conversations for the user
  const fetchConversations = useCallback(async () => {
    if (!user) {
      setConversations([]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('chat_conversations')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Error fetching conversations:', error);
        return;
      }

      setConversations(data || []);
    } catch (error) {
      console.error('Error in fetchConversations:', error);
    }
  }, [user]);

  // Fetch messages for a specific conversation
  const fetchMessages = useCallback(async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in fetchMessages:', error);
      return [];
    }
  }, []);

  // Create a new conversation
  const createConversation = useCallback(async (title?: string): Promise<ChatConversation | null> => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('chat_conversations')
        .insert({
          user_id: user.id,
          title: title || 'New Chat',
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating conversation:', error);
        return null;
      }

      setConversations(prev => [data, ...prev]);
      setCurrentConversation(data);
      setMessages([]);
      return data;
    } catch (error) {
      console.error('Error in createConversation:', error);
      return null;
    }
  }, [user]);

  // Load a conversation
  const loadConversation = useCallback(async (conversationId: string) => {
    setIsLoading(true);
    try {
      // Find conversation in list or fetch it
      let conversation = conversations.find(c => c.id === conversationId);
      
      if (!conversation) {
        const { data, error } = await supabase
          .from('chat_conversations')
          .select('*')
          .eq('id', conversationId)
          .single();

        if (error || !data) {
          console.error('Error loading conversation:', error);
          return;
        }
        conversation = data;
      }

      setCurrentConversation(conversation);
      
      // Fetch messages
      const msgs = await fetchMessages(conversationId);
      setMessages(msgs);
    } finally {
      setIsLoading(false);
    }
  }, [conversations, fetchMessages]);

  // Add a message to the current conversation
  const addMessage = useCallback(async (
    role: 'user' | 'assistant',
    content: string,
    metadata?: Record<string, any>
  ): Promise<ChatMessage | null> => {
    if (!currentConversation) return null;

    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert({
          conversation_id: currentConversation.id,
          role,
          content,
          metadata: metadata || {},
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding message:', error);
        return null;
      }

      setMessages(prev => [...prev, data]);

      // Update conversation title if it's the first user message
      if (role === 'user' && messages.filter(m => m.role === 'user').length === 0) {
        const title = content.slice(0, 50) + (content.length > 50 ? '...' : '');
        await updateConversationTitle(currentConversation.id, title);
      }

      // Update conversation's updated_at
      await supabase
        .from('chat_conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', currentConversation.id);

      return data;
    } catch (error) {
      console.error('Error in addMessage:', error);
      return null;
    }
  }, [currentConversation, messages]);

  // Update conversation title
  const updateConversationTitle = useCallback(async (conversationId: string, title: string) => {
    try {
      const { error } = await supabase
        .from('chat_conversations')
        .update({ title })
        .eq('id', conversationId);

      if (error) {
        console.error('Error updating title:', error);
        return;
      }

      setConversations(prev => 
        prev.map(c => c.id === conversationId ? { ...c, title } : c)
      );
      
      if (currentConversation?.id === conversationId) {
        setCurrentConversation(prev => prev ? { ...prev, title } : null);
      }
    } catch (error) {
      console.error('Error in updateConversationTitle:', error);
    }
  }, [currentConversation]);

  // Toggle saved status
  const toggleSaved = useCallback(async (conversationId: string) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (!conversation) return;

    try {
      const { error } = await supabase
        .from('chat_conversations')
        .update({ is_saved: !conversation.is_saved })
        .eq('id', conversationId);

      if (error) {
        console.error('Error toggling saved:', error);
        return;
      }

      setConversations(prev => 
        prev.map(c => c.id === conversationId ? { ...c, is_saved: !c.is_saved } : c)
      );
    } catch (error) {
      console.error('Error in toggleSaved:', error);
    }
  }, [conversations]);

  // Delete a conversation
  const deleteConversation = useCallback(async (conversationId: string) => {
    try {
      const { error } = await supabase
        .from('chat_conversations')
        .delete()
        .eq('id', conversationId);

      if (error) {
        console.error('Error deleting conversation:', error);
        return;
      }

      setConversations(prev => prev.filter(c => c.id !== conversationId));
      
      if (currentConversation?.id === conversationId) {
        setCurrentConversation(null);
        setMessages([]);
      }
    } catch (error) {
      console.error('Error in deleteConversation:', error);
    }
  }, [currentConversation]);

  // Clear current conversation (for new chat)
  const clearCurrentConversation = useCallback(() => {
    setCurrentConversation(null);
    setMessages([]);
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  return {
    conversations,
    currentConversation,
    messages,
    isLoading,
    fetchConversations,
    createConversation,
    loadConversation,
    addMessage,
    updateConversationTitle,
    toggleSaved,
    deleteConversation,
    clearCurrentConversation,
    setMessages,
  };
}
