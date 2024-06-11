import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import useStoryFetching from '../../services/story.service.js';
import WebSocketService from '../../services/webSocket.service.js';
import { useServer } from '../../assets/context/server.context.js';
import Settings from '../../utils/setting.js';

function Story({ chapterId, title, numChapter }) {
  const { selectedServer } = useServer();
  const [_selectedServer, _setSelectedServer] = useState(selectedServer);
  const [_chapterId, setChapterId] = useState(chapterId);
  const [_numChapter, setNumChapter] = useState(numChapter);
  
  const storyUrl = `/${_selectedServer}/story/${_chapterId}/${title}/${_numChapter}`;
  const { dataStory, loadingStory } = useStoryFetching(storyUrl);

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem('currentReadingState')) || [];
    if (Array.isArray(savedState)) {
      const currentStory = savedState.find(story => story._title === title);
      if (currentStory) {
        setChapterId(currentStory._chapterId);
        setNumChapter(currentStory._numChapter);
      }
    }
  }, [title]);

  useEffect(() => {
    const saveStoryState = () => {
        const savedStories = JSON.parse(localStorage.getItem('currentReadingState')) || [];

        const storiesArray = Array.isArray(savedStories) ? savedStories : [];

        const updatedStories = storiesArray.filter(story => story._title !== title);
        updatedStories.push({
            title: dataStory?.story_name,
            numChapter: dataStory?.chapter_name,
            _title: title,
            _chapterId: _chapterId,
            _numChapter: _numChapter
        });

        // Remove oldest items if the array length exceeds 10
        while (updatedStories.length > 10) {
            updatedStories.shift();
        }

        localStorage.setItem('currentReadingState', JSON.stringify(updatedStories));
    };

    if (dataStory) {
      saveStoryState();
    }
  }, [_chapterId, _numChapter, title, dataStory]);

  const handlePluginClick = (pluginName) => {
    _setSelectedServer(pluginName);
  };

  const clearReadingState = () => {
    localStorage.removeItem('currentReadingState');
  };

  const [dataPlugins, setDataPlugins] = useState(null);
  const [error, setError] = useState(null);
  const [loadingPlugins, setLoading] = useState(true);

  useEffect(() => {
    const webSocketService = new WebSocketService('/api/plugins');
    webSocketService.startPolling();
    const handleDataUpdate = (data) => {
      setDataPlugins(data);
      setLoading(false);
    };
    const handleError = (error) => {
      setError(error);
      setLoading(false);
    };
    webSocketService.setDataUpdateHandler(handleDataUpdate);
    webSocketService.setErrorHandler(handleError);
    return () => {
      webSocketService.stopPolling();
    };
  }, []);

  const [settings, setSettings] = useState({
    backgroundColor: '#ffffff',
    fontSize: 26,
    fontFamily: 'Palatino',
    width: 900,
  });

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings);
  };

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleNextChapter = () => {
    setChapterId((prevChapterId) => parseInt(prevChapterId) + 1);
    setNumChapter((prevNumChapter) => {
      let num = parseInt(prevNumChapter.split('-')[1]);
      num += 1;
      return 'chuong-' + num;
    });
  };

  const handlePreviousChapter = () => {
    setChapterId((prevChapterId) => parseInt(prevChapterId) > 1 ? parseInt(prevChapterId) - 1 : 1);
    setNumChapter((prevNumChapter) => {
      let num = parseInt(prevNumChapter.split('-')[1]);
      num = num > 1 ? num - 1 : 1;
      return 'chuong-' + num;
    });
  };

  const navigationButtons = (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
      <Button onClick={handlePreviousChapter} style={{ backgroundColor: '#D3EBCD', color: '#737373' }}>
        <span style={{ fontSize: '20px' }}>&larr;</span> Chương trước
      </Button>
      <Button onClick={handleNextChapter} style={{ backgroundColor: '#80CEB1', color: 'white' }}>
        <span style={{ fontSize: '20px' }}>Chương tiếp</span> &rarr;
      </Button>
    </div>
  );

  return (
    <div style={{ backgroundColor: settings.backgroundColor, color: 'black', fontSize: `${settings.fontSize}px`, fontFamily: settings.fontFamily, maxWidth: `${settings.width}px`, margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          {loadingPlugins ? (
            <div>Loading...</div>
          ) : (
            Array.isArray(dataPlugins) &&
            dataPlugins.map((plugin) => (
              <Button key={plugin.name} onClick={() => handlePluginClick(plugin.name)} style={{ margin: '5px', backgroundColor: '#FFFF00', color: 'black', display: 'inline-block', alignItems: 'center', textAlign: 'center' }}>
                {plugin.name}
              </Button>
            ))
          )}
        </div>
        <Button onClick={openModal}>
          Hiển thị tùy chỉnh
        </Button>
        <Button onClick={clearReadingState} style={{ marginLeft: '10px', backgroundColor: '#FF6347', color: 'white' }}>
          Xóa trạng thái đọc
        </Button>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tuỳ chỉnh</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Settings onSettingsChange={handleSettingsChange} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={closeModal}>Đóng</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {loadingStory ? (
        <div>Loading story...</div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <h1>{dataStory.story_name}</h1>
          <h2>{dataStory.chapter_name}</h2>
          {navigationButtons}

          <div dangerouslySetInnerHTML={{ __html: dataStory.content }} />
        </div>
      )}
      
      {navigationButtons}
    </div>
  );
}

export default Story;
