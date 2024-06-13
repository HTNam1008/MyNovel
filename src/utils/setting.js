import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import './setting.css';
const Settings = ({ onSettingsChange }) => {
  const [settings, setSettings] = useState({
    backgroundColor: '#ffffff',
    fontSize: 26,
    fontFamily: 'Palatino',
    width: 900,
  });

  const handleThemeChange = (color) => {
    setSettings((prevSettings) => ({ ...prevSettings, backgroundColor: color }));
    onSettingsChange({ ...settings, backgroundColor: color });
  };

  const handleFontSizeChange = (size) => {
    setSettings((prevSettings) => ({ ...prevSettings, fontSize: size }));
    onSettingsChange({ ...settings, fontSize: size });
  };

  const handleFontFamilyChange = (font) => {
    setSettings((prevSettings) => ({ ...prevSettings, fontFamily: font }));
    onSettingsChange({ ...settings, fontFamily: font });
  };

  const handleWidthChange = (width) => {
    setSettings((prevSettings) => ({ ...prevSettings, width }));
    onSettingsChange({ ...settings, width });
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
