import React, { useState, useEffect } from 'react';
import { fetchNotesByFolder, createNote } from '../api'; // Apne api path ke hisab se verify kar lein
import Notecard from '../components/Notecard'; // Apke folder structure ke mutabiq path check kar lena

function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('General');
  const [isLocked, setIsLocked] = useState(false);
  const [pin, setPin] = useState('');
  // 1. Notes fetch karne ka function
  const loadNotes = async () => {
    try {
      const res = await fetchNotesByFolder(selectedFolder);
      console.log("API Response:", res);

      // Data array ya object parsing logic
      const responseData = res?.data || res;
      const notesArray = Array.isArray(responseData)
        ? responseData
        : (responseData?.notes || responseData?.data || []);

      setNotes(notesArray);
    } catch (err) {
      console.error('Error fetching notes:', err);
    }
  };


  const handleAISummarize = () => {
      if (!content) return alert("Pehle kuch content toh likho!");
     const summarizedText = `• Summary: ${content.substring(0, 100)}...\n• Key Takeaway: Important notes documented successfully.`;
     setContent(summarizedText);
  };

  useEffect(() => {
    loadNotes();
  }, [selectedFolder]);

  // 2. Note create karne ka handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      const res = await createNote({
        title,
        description: content,
        folder: selectedFolder || 'General',
        isLocked,
        pin: isLocked ?  pin:''
      });
      // Save hone ke baad local state me add karna aur notes reload karna
      const newNote = res?.note || res?.data || res;
      if (newNote && newNote._id) {
        setNotes((prev) => [newNote, ...prev]);
      } else {
        await loadNotes();
      }

      setTitle('');
      setContent('');
      setIsLocked(false);
      setPin('');
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: "'Inter', sans-serif", paddingBottom: '50px' }}>
      
      {/* Top Professional Navbar */}
      <header style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '16px 36px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #0d9488, #0284c7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontSize: '22px',
            boxShadow: '0 4px 12px rgba(13, 148, 136, 0.25)'
          }}>
            📝
          </div>
          <div>
            <h2 style={{ margin: 0, color: '#0f172a', fontSize: '20px', fontWeight: '700' }}>
              Notes Dashboard
            </h2>
            <p style={{ margin: 0, color: '#64748b', fontSize: '12px' }}>
              Organize & secure your daily notes
            </p>
          </div>
        </div>

        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '9px 20px',
            backgroundColor: '#ffffff',
            color: '#ef4444',
            border: '1.5px solid #fecaca',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          Logout
        </button>
      </header>

      {/* Main Container */}
      <div style={{ maxWidth: '1000px', margin: '32px auto 0', padding: '0 20px' }}>
        
        {/* Folder Selector Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '28px', justifyContent: 'center' }}>
          {['General', 'Work', 'Personal'].map((folder) => (
            <button
              key={folder}
              onClick={() => setSelectedFolder(folder)}
              style={{
                padding: '10px 24px',
                borderRadius: '30px',
                border: selectedFolder === folder ? 'none' : '1px solid #cbd5e1',
                backgroundColor: selectedFolder === folder ? '#0d9488' : '#ffffff',
                color: selectedFolder === folder ? '#ffffff' : '#475569',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: selectedFolder === folder ? '0 4px 14px rgba(13, 148, 136, 0.3)' : '0 2px 4px rgba(0,0,0,0.02)',
                transition: 'all 0.2s ease'
              }}
            >
              📂 {folder}
            </button>
          ))}
        </div>

        {/* Modern Note Creation Box */}
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: '#ffffff',
            padding: '28px',
            borderRadius: '20px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.04)',
            marginBottom: '36px'
          }}
        >
          <input
            type="text"
            placeholder="Note Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '10px',
              border: '1.5px solid #e2e8f0',
              fontSize: '16px',
              fontWeight: '600',
              outline: 'none',
              boxSizing: 'border-box',
              marginBottom: '14px',
              backgroundColor: '#f8fafc'
            }}
          />

          <textarea
            placeholder="Write your content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '10px',
              border: '1.5px solid #e2e8f0',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box',
              backgroundColor: '#f8fafc',
              fontFamily: 'inherit',
              resize: 'vertical',
              marginBottom: '18px'
            }}
          />

          {/* AI Summarize & Lock Options */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                type="button"
                onClick={handleAISummarize}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  backgroundColor: '#f3e8ff',
                  color: '#7e22ce',
                  border: '1px solid #d8b4fe',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                ✨ Summarize with AI
              </button>

              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#475569', fontWeight: '600', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={isLocked}
                  onChange={(e) => setIsLocked(e.target.checked)}
                  style={{ accentColor: '#0d9488', width: '16px', height: '16px' }}
                />
                🔒 Lock Note
              </label>

              {isLocked && (
                <input
                  type="password"
                  placeholder="PIN (4 digits)"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  maxLength="4"
                  style={{
                    width: '100px',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '13px',
                    outline: 'none'
                  }}
                />
              )}
            </div>

            <button
              type="submit"
              style={{
                padding: '11px 26px',
                background: 'linear-gradient(135deg, #0d9488, #0284c7)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(13, 148, 136, 0.25)'
              }}
            >
              + Add Note
            </button>

          </div>
        </form>

        {/* Section Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ color: '#0f172a', margin: 0, fontSize: '18px', fontWeight: '700' }}>
            Notes in "{selectedFolder}"
          </h3>
          <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '600' }}>
            Total: {notes.length}
          </span>
        </div>

        {/* Notes Grid Container */}
        {notes.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '48px 20px',
            color: '#64748b',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px dashed #cbd5e1'
          }}>
            <p style={{ fontSize: '15px', margin: 0, fontWeight: '500' }}>
              No notes found in this folder. Create your first note above! 🚀
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: '20px'
          }}>
            {notes.map((note) => (
              <Notecard key={note._id} note={note} loadNotes={loadNotes} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Home;