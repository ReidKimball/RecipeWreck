/**
 * @file src/app/onboarding/page.tsx
 * @description Main onboarding page component for Creator Spaces application.
 * This page provides a chat interface for users to create and manage AI Roles through
 * natural language conversations with an AI assistant.
 *
 * @module OnboardingChatPage
 * @requires react
 * @requires react-hot-toast
 * @requires @mui/material
 * @requires @mui/icons-material
 * @requires next/router
 * @requires @/models/AiRole
 *
 * @author Cascade
 * @date 2025-06-09
 */

"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import {
  Box, Container, TextField, Button, Paper, Typography, List, ListItem, ListItemText,
  Drawer, Divider, ListItemButton,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel'; // For the close button in dialog
import SendIcon from '@mui/icons-material/Send'; // Ensured SendIcon is imported
import CircularProgress from '@mui/material/CircularProgress';

/**
 * Represents a single message in the chat interface.
 * @interface Message
 * @property {string} id - Unique identifier for the message
 * @property {string} text - The content of the message
 * @property {'user' | 'ai'} sender - The sender of the message, either 'user' or 'ai'
 */
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

/**
 * Represents an AI Role in the system.
 * @interface AiRole
 * @property {string} id - Unique identifier for the AI Role
 * @property {string} title - Title of the AI Role
 * @property {string} description - Description of the AI Role
 * @property {string} systemPromptText - The system prompt that defines the AI's behavior
 * @property {string} category - Category the AI Role belongs to
 * @property {string[]} tags - Array of tags for categorization
 * @property {number} version - Version number of the AI Role
 * @property {string} createdAt - ISO timestamp of when the role was created
 * @property {string} createdBy - Identifier of who created the role
 */
interface AiRole {
  id: string;
  title: string;
  description: string;
  systemPromptText: string;
  category: string;
  tags: string[];
  version: number;
  createdAt: string;
  createdBy: string;
}

/**
 * Interface for the editable form state in the AI Role modal.
 * @interface EditableAiRoleForm
 * @property {string} [title] - Title of the AI Role
 * @property {string} [description] - Description of the AI Role
 * @property {string} [systemPromptText] - The system prompt text
 * @property {string} [category] - Category of the AI Role
 * @property {string} [tags] - Tags as a single comma-separated string for editing
 */
interface EditableAiRoleForm {
  title?: string;
  description?: string;
  systemPromptText?: string;
  category?: string;
  tags?: string; // Tags as a single comma-separated string for editing
}

const drawerWidth = 280;

/**
 * Main component for the onboarding chat interface.
 * Manages the chat state, AI Role creation/editing, and API interactions.
 * 
 * @component
 * @returns {JSX.Element} The rendered onboarding chat page
 * 
 * @example
 * // Basic usage
 * <OnboardingChatPage />
 */
const OnboardingChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Welcome to Creator Spaces! I am here to help you get started by creating your AI Roles. What kind of assistant are you looking to build today? For example, you could say "I want a creative writing assistant" or "I need an AI to help me summarize technical documents". Don\'t worry about perfection, you can edit the roles after they are created.', sender: 'ai' },
  ]);
  const [inputText, setInputText] = useState('');
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [createdAiRoles, setCreatedAiRoles] = useState<AiRole[]>([]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoleForModal, setSelectedRoleForModal] = useState<AiRole | null>(null);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableRole, setEditableRole] = useState<EditableAiRoleForm>({});

  /**
   * Fetches existing AI roles from the server when the component mounts.
   * Updates the local state with the fetched roles.
   * @async
   * @function fetchAiRoles
   * @returns {Promise<void>}
   */
  useEffect(() => {
    const fetchAiRoles = async () => {
      try {
        const response = await fetch('/api/ai-roles');
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response on fetch roles' }));
          console.error('Failed to fetch AI roles:', response.status, response.statusText, errorData.message);
          toast.error(`Error fetching AI roles: ${errorData.message || response.statusText}`);
          return;
        }
        const roles: AiRole[] = await response.json();
        setCreatedAiRoles(roles);
        if (roles.length > 0) {
          console.log('Successfully fetched and set AI roles:', roles);
        } else {
          console.log('No AI roles found in the database or an empty array was returned.');
        }
      } catch (error: any) {
        console.error('Error in fetchAiRoles:', error);
        toast.error('An unexpected error occurred while fetching AI roles.');
      }
    };

    fetchAiRoles();
  }, []); // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  /**
   * Handles sending a new message in the chat.
   * Sends the message to the API and updates the chat interface with the response.
   * @async
   * @function handleSendMessage
   * @returns {Promise<void>}
   */
  const handleSendMessage = async () => {
    if (inputText.trim() === '' || isSendingMessage) return;

    setIsSendingMessage(true);
    const newUserMessage: Message = { id: String(Date.now()), text: inputText, sender: 'user' };
    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');
    // Prepare conversation history for the API - send all messages *before* the current newUserMessage
    const historyForApi = messages.filter(msg => msg.id !== newUserMessage.id).map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model', // API expects 'user' or 'model'
      parts: [{ text: msg.text }]
    }));

    const apiCallPromise = fetch('/api/onboarding/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: newUserMessage.text, // Current message text
        conversationHistory: historyForApi // History up to, but not including, the current message
      }),
    })
    .then(async (response) => {
      if (!response.ok) {
        let errorResponseMessage = 'Unknown error'; // Default message
        try {
          const errorData = await response.json();
          console.log('Received errorData from API:', errorData); // Log the received error data
          if (errorData && errorData.message) {
            errorResponseMessage = errorData.message;
          } else if (errorData && errorData.aiResponseText) { // Fallback to aiResponseText
            errorResponseMessage = errorData.aiResponseText;
          } else if (typeof errorData === 'string' && errorData.length > 0) {
            errorResponseMessage = errorData; // If errorData itself is a string
          } else if (response.statusText) {
            errorResponseMessage = response.statusText; // Use statusText if no better message
          }
        } catch (e) {
          // This catch block handles failure in response.json() itself (e.g., not valid JSON)
          console.error('Failed to parse error JSON from API:', e);
          try {
            // Attempt to get raw text if JSON parsing failed
            const rawText = await response.text();
            console.log('Raw error response text from API:', rawText);
            errorResponseMessage = rawText.substring(0, 150) || response.statusText || 'Error response not readable';
          } catch (textError) {
            console.error('Failed to get raw error text from API:', textError);
            errorResponseMessage = response.statusText || 'Error response not readable';
          }
        }
        throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorResponseMessage}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.aiResponseText) {
        const newAiMessage: Message = { id: String(Date.now() + 1), text: data.aiResponseText, sender: 'ai' };
        setMessages(prev => [...prev, newAiMessage]);
      }
      if (data.aiRoleJson) {
        // Ensure the received aiRoleJson matches the AiRole interface
        const newAiRole: AiRole = {
            id: data.aiRoleJson.id, // This will now be the MongoDB ID
            title: data.aiRoleJson.title,
            description: data.aiRoleJson.description,
            systemPromptText: data.aiRoleJson.systemPromptText,
            category: data.aiRoleJson.category,
            tags: data.aiRoleJson.tags || [],
            version: data.aiRoleJson.version || 1,
            createdAt: data.aiRoleJson.createdAt || new Date().toISOString(),
            createdBy: data.aiRoleJson.createdBy || 'api_session',
        };
        setCreatedAiRoles(prevRoles => [...prevRoles, newAiRole]);

        // UI Feedback for persistence
        if (newAiRole.id && newAiRole.category !== 'Error' && !newAiRole.title.startsWith('Warning: Invalid LLM Data')) {
          toast.success('AI Role persisted successfully!');
          console.log('AI Role received with ID (persisted):', newAiRole.id);
        } else if (newAiRole.title.startsWith('Warning: Invalid LLM Data')) {
          toast.error('AI Role has validation warnings. Review data.'); // Using toast.error for warnings
          console.warn('AI Role received with Zod validation warnings:', newAiRole.title);
        } else if (newAiRole.category === 'Error') {
          toast.error('Failed to generate valid AI Role JSON.');
          console.error('AI Role generation resulted in an error object:', newAiRole.title);
        } else {
          toast.error('AI Role generated (fallback/not persisted).'); // Using toast.error for info/fallback
          console.log('AI Role received (fallback/generated only, no ID or error category):', newAiRole.title);
        }
      }
    });

    apiCallPromise
    .catch(error => {
      console.error('Failed to send message or process AI response:', error);
      const errorText = error.message || 'Could not connect to the AI. Please try again.';
      const errorMessage: Message = {
        id: String(Date.now() + 1),
        text: `Error: ${errorText}`,
        sender: 'ai',
      };
      setMessages(prev => [...prev, errorMessage]);
    })
    .finally(() => {
      setIsSendingMessage(false);
    });
  };

  /**
   * Opens the AI Role details modal in view mode.
   * @function handleOpenModal
   * @param {AiRole} role - The AI Role to display in the modal
   */
  const handleOpenModal = (role: AiRole) => {
    setSelectedRoleForModal(role);
    setEditableRole({
      title: role.title,
      description: role.description,
      systemPromptText: role.systemPromptText,
      category: role.category,
      tags: Array.isArray(role.tags) ? role.tags.join(', ') : '',
    });
    setIsEditMode(false); // Always start in view mode
    setIsModalOpen(true);
  };

  /**
   * Closes the AI Role details modal and resets the form state.
   * @function handleCloseModal
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRoleForModal(null);
    setIsEditMode(false); // Reset edit mode on close
    setEditableRole({}); // Clear editable role data
  };

  /**
   * Switches the AI Role modal to edit mode.
   * Populates the form fields with the current role's data.
   * @function handleEnterEditMode
   */
  const handleEnterEditMode = () => {
    if (selectedRoleForModal) {
      setEditableRole({
        title: selectedRoleForModal.title,
        description: selectedRoleForModal.description,
        systemPromptText: selectedRoleForModal.systemPromptText,
        category: selectedRoleForModal.category,
        tags: Array.isArray(selectedRoleForModal.tags) ? selectedRoleForModal.tags.join(', ') : '',
      });
      setIsEditMode(true);
    }
  };

  /**
   * Cancels the current edit operation and reverts to view mode.
   * Resets the form fields to the original role data.
   * @function handleCancelEdit
   */
  const handleCancelEdit = () => {
    setIsEditMode(false);
    if (selectedRoleForModal) {
      setEditableRole({
        title: selectedRoleForModal.title,
        description: selectedRoleForModal.description,
        systemPromptText: selectedRoleForModal.systemPromptText,
        category: selectedRoleForModal.category,
        tags: Array.isArray(selectedRoleForModal.tags) ? selectedRoleForModal.tags.join(', ') : '',
      });
    }
  };

  /**
   * Handles changes to form fields in the edit modal.
   * Updates the form state with the new field values.
   * @function handleFieldChange
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} event - The change event
   */
  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setEditableRole(prev => ({ 
      ...prev, 
      [name]: value // For tags, store the raw string directly
    }));
  };

  /**
   * Saves changes made to an AI Role.
   * Sends the updated data to the server and updates the UI accordingly.
   * @async
   * @function handleSaveChanges
   * @returns {Promise<void>}
   */
  const handleSaveChanges = async () => {
    if (!selectedRoleForModal || Object.keys(editableRole).length === 0) return;

    const tagsArray = (editableRole.tags && typeof editableRole.tags === 'string')
      ? editableRole.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag)
      : (Array.isArray(selectedRoleForModal.tags) ? selectedRoleForModal.tags : []);

    // Prepare the payload with only the updatable fields
    const payload: Partial<AiRole> = {};
    if (editableRole.title !== undefined && editableRole.title !== selectedRoleForModal.title) payload.title = editableRole.title;
    if (editableRole.description !== undefined && editableRole.description !== selectedRoleForModal.description) payload.description = editableRole.description;
    if (editableRole.systemPromptText !== undefined && editableRole.systemPromptText !== selectedRoleForModal.systemPromptText) payload.systemPromptText = editableRole.systemPromptText;
    if (editableRole.category !== undefined && editableRole.category !== selectedRoleForModal.category) payload.category = editableRole.category;
    // Check if tags actually changed
    const originalTagsString = Array.isArray(selectedRoleForModal.tags) ? selectedRoleForModal.tags.join(',') : '';
    const newTagsString = tagsArray.join(',');
    if (newTagsString !== originalTagsString) payload.tags = tagsArray;

    // If no actual changes, don't make an API call (optional, but good practice)
    if (Object.keys(payload).length === 0) {
      setIsEditMode(false);
      toast('No changes detected.'); 
      return;
    }

    const loadingToastId = toast.loading('Saving changes...');

    try {
      const response = await fetch(`/api/ai-roles/${selectedRoleForModal.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || response.statusText || 'Failed to save changes';
        console.error('Failed to save AI Role:', errorMessage);
        toast.error(`Error: ${errorMessage}`, { id: loadingToastId });
        return;
      }

      const updatedRoleFromServer: AiRole = await response.json();

      // Update the main list and selected role with data from server
      setCreatedAiRoles(prevRoles => 
        prevRoles.map(r => 
          r.id === updatedRoleFromServer.id ? updatedRoleFromServer : r
        )
      );
      setSelectedRoleForModal(updatedRoleFromServer);
      setIsEditMode(false);
      toast.success('Changes saved successfully!', { id: loadingToastId });

    } catch (error) {
      console.error('Error saving AI Role:', error);
      toast.error('An unexpected error occurred while saving.', { id: loadingToastId });
    }
  };

  /**
   * Executes the deletion of an AI Role after confirmation.
   * @async
   * @function executeDeleteRole
   * @param {string} roleId - The ID of the role to delete
   * @param {string} roleTitle - The title of the role (for user feedback)
   * @param {string} confirmationToastId - The ID of the confirmation toast
   * @returns {Promise<void>}
   */
  const executeDeleteRole = async (roleId: string, roleTitle: string, confirmationToastId: string) => {
    toast.dismiss(confirmationToastId);
    const loadingToastId = toast.loading(`Deleting AI Role "${roleTitle}"...`);

    try {
      const response = await fetch(`/api/ai-roles/${roleId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to delete AI Role:', errorData.message || response.statusText);
        toast.error(`Error: ${errorData.message || 'Failed to delete role'}`, { id: loadingToastId });
        return;
      }

      toast.success(`Role "${roleTitle}" deleted successfully!`, { id: loadingToastId });
      setCreatedAiRoles(prevRoles => prevRoles.filter(role => role.id !== roleId));
      setIsModalOpen(false);
      setSelectedRoleForModal(null);
      setIsEditMode(false);

    } catch (error) {
      console.error('Error deleting AI Role:', error);
      toast.error('An unexpected error occurred while deleting.', { id: loadingToastId });
    }
  };

  /**
   * Initiates the deletion process for an AI Role.
   * Shows a confirmation dialog before proceeding with deletion.
   * @function handleDeleteRole
   */
  const handleDeleteRole = () => {
    if (!selectedRoleForModal) return;
    const roleToDelete = selectedRoleForModal; // Capture the role for use in the toast

    toast(
      (t) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <Typography variant="subtitle1">
            Delete <strong>{roleToDelete.title}</strong>?
          </Typography>
          <Typography variant="caption" sx={{ mb: 1}}>This action cannot be undone.</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              variant="contained" 
              color="error" 
              size="small"
              onClick={() => executeDeleteRole(roleToDelete.id, roleToDelete.title, t.id)}
            >
              Delete
            </Button>
            <Button 
              variant="outlined" 
              size="small"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      ),
      {
        duration: Infinity, // Persist until explicitly dismissed or action taken
        position: 'top-center',
      }
    );
  };

  const sidebarContent = (
    <Box>
      <Typography variant="h6" sx={{ p: 2, textAlign: 'center' }}>
        Manage AI Roles
      </Typography>
      <Divider />
      <List>
        {createdAiRoles.length === 0 && (
          <ListItem>
            <ListItemText primary="No roles created yet. Chat with the AI to make one!" sx={{textAlign: 'center', color: 'text.secondary'}}/>
          </ListItem>
        )}
        {createdAiRoles.map((role) => (
          <ListItem key={role.id} disablePadding>
            <ListItemButton onClick={() => handleOpenModal(role)}>
              <ListItemText primary={role.title} secondary={`Created: ${new Date(role.createdAt).toLocaleTimeString()}`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', position: 'relative' },
          }}
        >
          {sidebarContent}
        </Drawer>
        
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 0, display: 'flex', flexDirection: 'column', height: '100vh' }}
        >
          <Container maxWidth="md" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', py: 2, height: 'calc(100% - 64px - 16px)' }}>
            <Typography variant="h5" component="h1" gutterBottom align="center" sx={{pt:1}}>
              Create AI Roles
            </Typography>
            <Paper ref={chatContainerRef} elevation={3} sx={{ flexGrow: 1, overflow: 'auto', p: 2, mb: 2 }}>
              <List>
                {messages.map((msg) => (
                  <ListItem key={msg.id} sx={{ justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                    <Paper elevation={1} sx={{ p: 1.5, bgcolor: msg.sender === 'user' ? 'primary.light' : 'grey.200', color: msg.sender === 'user' ? 'primary.contrastText' : 'black', maxWidth: '70%', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
                      <ListItemText primary={msg.text} />
                    </Paper>
                  </ListItem>
                ))}
              </List>
            </Paper>
            <Box sx={{ display: 'flex', gap: 1, pb: 1 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type your message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={isSendingMessage} // Disable input while sending
                sx={{ 
                  mr: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '20px',
                    backgroundColor: 'primary.light',
                    color: 'primary.contrastText',
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      border: 'none'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                      boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.5)'
                    },
                    '&::placeholder': {
                      color: 'rgba(255, 255, 255, 0.7)',
                      opacity: 1
                    }
                  }
                }}
              />
              <IconButton 
                color="primary" 
                onClick={handleSendMessage} 
                disabled={isSendingMessage} // Disable button while sending
                sx={{ 
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                  borderRadius: '50%',
                  padding: '12px',
                  position: 'relative', // For positioning CircularProgress
                  width: '48px', // Explicit size to match TextField's typical height with padding
                  height: '48px',
                }}
              >
                {isSendingMessage ? <CircularProgress size={24} sx={{ color: 'white', position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px' }} /> : <SendIcon />}
              </IconButton>
            </Box>
          </Container>
        </Box>

        {/* AI Role Details Modal */}
        {selectedRoleForModal && (
          <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth maxWidth="md">
            <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {isEditMode ? `Edit: ${editableRole?.title || selectedRoleForModal.title}` : selectedRoleForModal.title}
              {!isEditMode && (
                <IconButton aria-label="edit" onClick={handleEnterEditMode} sx={{ color: (theme) => theme.palette.grey[700] }}>
                  <EditIcon />
                </IconButton>
              )}
            </DialogTitle>
            <DialogContent dividers>
              {isEditMode && editableRole ? (
                <Box component="form" noValidate autoComplete="off" sx={{ pt: 1 }}>
                  <TextField
                    margin="dense" label="Title" type="text" fullWidth variant="outlined"
                    name="title" value={editableRole.title || ''} onChange={handleFieldChange}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    margin="dense" label="Description" type="text" fullWidth multiline rows={3} variant="outlined"
                    name="description" value={editableRole.description || ''} onChange={handleFieldChange}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    margin="dense" label="System Prompt" type="text" fullWidth multiline rows={5} variant="outlined"
                    name="systemPromptText" value={editableRole.systemPromptText || ''} onChange={handleFieldChange}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    margin="dense" label="Category" type="text" fullWidth variant="outlined"
                    name="category" value={editableRole.category || ''} onChange={handleFieldChange}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    margin="dense" label="Tags (comma-separated)" type="text" fullWidth variant="outlined"
                    name="tags" value={editableRole.tags || ''} onChange={handleFieldChange}
                    sx={{ mb: 2 }}
                  />
                </Box>
              ) : (
                <>
                  <Typography gutterBottom variant="h6">Description:</Typography>
                  <Typography gutterBottom sx={{whiteSpace: 'pre-wrap'}}>{selectedRoleForModal.description}</Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography gutterBottom variant="h6">System Prompt:</Typography>
                  <Typography gutterBottom sx={{whiteSpace: 'pre-wrap'}}>{selectedRoleForModal.systemPromptText}</Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography gutterBottom variant="h6">Category:</Typography>
                  <Typography gutterBottom>{selectedRoleForModal.category}</Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography gutterBottom variant="h6">Tags:</Typography>
                  <Typography gutterBottom>{selectedRoleForModal.tags.join(', ')}</Typography>
                </>
              )}
            </DialogContent>
            <DialogActions sx={{ justifyContent: isEditMode ? 'space-between' : 'flex-end', p: '16px 24px' }}>
              {isEditMode ? (
                <>
                  <Button onClick={handleDeleteRole} color="error" startIcon={<DeleteIcon />}>
                    Delete
                  </Button>
                  <Box>
                    <Button onClick={handleCancelEdit} startIcon={<CancelIcon />} sx={{ mr: 1 }}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveChanges} variant="contained" startIcon={<SaveIcon />}>
                      Save Changes
                    </Button>
                  </Box>
                </>
              ) : (
                <Button onClick={handleCloseModal}>Close</Button>
              )}
            </DialogActions>
          </Dialog>
        )}
      </Box>
    </>
  );
};

export default OnboardingChatPage;
