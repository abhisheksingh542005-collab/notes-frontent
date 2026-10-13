const API_URL = 'https://notes-backent.vercel.app/api/v1'; // ya jo bhi aapka backend URL ho

export const fetchNotesByFolder = async (folderName) => {
  try {
    const response = await fetch(`${API_URL}/notes/get/${folderName}`);
    return await response.json();
  } catch (error) {
    console.log('error fetching notes:', error);
    return [];
  }
};

export const createNote = async (noteData) => {
  try {
    const response = await fetch(`${API_URL}/notes/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(noteData),
    });
    return await response.json();
  } catch (error) {
    console.log('error creating note:', error);
  }
};

// 1. Update Note
export const updateNote = async (id, updatedData) => {
  try {
    const response = await fetch(`${API_URL}/notes/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });
    return await response.json();
  } catch (error) {
    console.log('error updating note:', error);
  }
};

// 2. Toggle Pin Note
export const togglePinNote = async (id) => {
  try {
    const response = await fetch(`${API_URL}/notes/pin/${id}`, {
      method: 'PATCH',
    });
    return await response.json();
  } catch (error) {
    console.log('error toggling pin:', error);
  }
};

// 3. Toggle Archive Note
export const toggleArchiveNote = async (id) => {
  try {
    const response = await fetch(`${API_URL}/notes/archive/${id}`, {
      method: 'PATCH',
    });
    return await response.json();
  } catch (error) {
    console.log('error toggling archive:', error);
  }
};

// 4. Delete Note
export const deleteNote = async (id) => {
  try {
    const response = await fetch(`${API_URL}/notes/delete/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  } catch (error) {
    console.log('error deleting note:', error);
  }
};
