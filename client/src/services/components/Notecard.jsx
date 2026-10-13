import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import { deleteNote, togglePinNote, toggleArchiveNote } from '../api';

function Notecard({ note, loadNotes }) {
  const [isUnlocked, setIsUnlocked] = useState(!note.isLocked);
  const [enteredPin, setEnteredPin] = useState('');

  const handleDelete = async () => {
    await deleteNote(note._id);
    loadNotes();
  };

  const handlePin = async () => {
    await togglePinNote(note._id);
    loadNotes();
  };

  const handleArchive = async () => {
    await toggleArchiveNote(note._id);
    loadNotes();
  };

  const handleDownloadPdf = () => {
  const element = document.getElementById(`note-content-${note._id}`);
  const options = {
    margin: 10,
    filename: `${note.title || 'note'}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().from(element).save();
};

const handleUnlock = (e) => {
  e.preventDefault();
  if (enteredPin === note.pin) {
    setIsUnlocked(true);
  } else {
    alert('Wrong PIN!');
  }
};

  return (
    <div
      id={`note-${note._id}`}
      style={{
        background: note.isPinned ? '#f0fdf4' : '#ffffff',
        padding: '24px',
        borderRadius: '16px',
        border: note.isPinned ? '2px solid #319795' : '1px solid #e2e8f0',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '200px',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', gap: '10px' }}>
          <h3
            style={{
              margin: 0,
              color: '#1e293b',
              fontSize: '20px',
              fontWeight: '700',
              letterSpacing: '-0.3px',
              wordBreak: 'break-word',
            }}
          >
            {note.title}
          </h3>
          <span
            style={{
              fontSize: '12px',
              background: note.isPinned ? '#319795' : '#f1f5f9',
              color: note.isPinned ? '#fff' : '#64748b',
              padding: '4px 12px',
              borderRadius: '20px',
              fontWeight: '600',
              whiteSpace: 'nowrap',
            }}
          >
            {note.isPinned ? '📌 Pinned' : note.folder || 'General'}
          </span>
        </div>

        <p
          style={{
            margin: '0 0 20px 0',
            color: '#475569',
            fontSize: '15px',
            lineHeight: '1.6',
            wordBreak: 'break-word',
            whiteSpace: 'pre-wrap',
          }}
        >
          {note.description || note.content}
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '10px',
          borderTop: '1px solid #f1f5f9',
          paddingTop: '14px',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={handlePin}
          style={{
            padding: '8px 14px',
            background: note.isPinned ? '#edf2f7' : '#f8fafc',
            border: '1px solid #cbd5e1',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '600',
            color: '#334155',
          }}
        >
          {note.isPinned ? '📍 Unpin' : '📌 Pin'}
        </button>

        <button
          onClick={handleArchive}
          style={{
            padding: '8px 14px',
            background: '#f8fafc',
            border: '1px solid #cbd5e1',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '600',
            color: '#334155',
          }}
        >
          {note.isArchived ? '📂 Unarchive' : '📥 Archive'}
        </button>

        <button
          onClick={handleDownloadPdf}
          style={{
            padding: '8px 14px',
            background: '#e0f2fe',
            border: '1px solid #bae6fd',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '600',
            color: '#0369a1',
          }}
        >
          ⬇️ PDF
        </button>

        <button
          onClick={handleDelete}
          style={{
            padding: '8px 14px',
            background: '#fee2e2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '600',
            color: '#dc2626',
            marginLeft: 'auto',
          }}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default Notecard;
