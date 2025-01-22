import React, { useState, useEffect } from 'react';

const EditorSettings = ({ onSave }) => {
  const [settings, setSettings] = useState({
    duplicateLine: 'Ctrl+D',
    formatDocument: 'Shift+Alt+F',
    // ... other shortcuts
  });

  const handleSave = () => {
    localStorage.setItem('editorSettings', JSON.stringify(settings));
    onSave(settings);
  };

  return (
    <div className="settings-panel">
      <h2>Editor Settings</h2>
      <div className="shortcut-setting">
        <label>Duplicate Line:</label>
        <input
          type="text"
          value={settings.duplicateLine}
          onChange={(e) => setSettings({
            ...settings,
            duplicateLine: e.target.value
          })}
        />
      </div>
      {/* Add more shortcut settings */}
      <button onClick={handleSave}>Save Settings</button>
    </div>
  );
};

export default EditorSettings; 