import React, { useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import './setting.css';

const Settings = ({ currentSettings, onSettingsChange }) => {
  const [settings, setSettings] = useState(currentSettings);

  useEffect(() => {
    setSettings(currentSettings);
  }, [currentSettings]);

  const handleThemeChange = (color) => {
    const newSettings = { ...settings, backgroundColor: color };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const handleFontSizeChange = (size) => {
    const newSettings = { ...settings, fontSize: size };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const handleFontFamilyChange = (font) => {
    const newSettings = { ...settings, fontFamily: font };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const handleWidthChange = (width) => {
    const newSettings = { ...settings, width };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  return (
    <div className="settings">
      <div className="setting-group">
        <label>Theme:</label>
        <div className="theme-options">
          {['#ffffff', '#f8f3d4', '#d4f8e8', '#d4e3f8', '#f8d4d4', '#333333'].map((color) => (
            <div key={color} className="theme-option" style={{ backgroundColor: color }} onClick={() => handleThemeChange(color)} />
          ))}
        </div>
      </div>
      <div className="setting-group">
        <label>Font chữ:</label>
        <div className="font-options">
          {['Palatino', 'Times', 'Arial', 'Georgia'].map((font) => (
            <div key={font} className={`font-option ${settings.fontFamily === font ? 'active' : ''}`} onClick={() => handleFontFamilyChange(font)}>
              {font}
            </div>
          ))}
        </div>
      </div>
      <div className="setting-group">
        <label>Cỡ chữ:</label>
        <div className="font-size-control">
          <Button onClick={() => handleFontSizeChange(settings.fontSize - 1)}>-</Button>
          <span>{settings.fontSize}</span>
          <Button onClick={() => handleFontSizeChange(settings.fontSize + 1)}>+</Button>
        </div>
      </div>
      <div className="setting-group">
        <label>Màn:</label>
        <div className="width-control">
          <Button onClick={() => handleWidthChange(settings.width - 50)}>-</Button>
          <span>{settings.width}</span>
          <Button onClick={() => handleWidthChange(settings.width + 50)}>+</Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
