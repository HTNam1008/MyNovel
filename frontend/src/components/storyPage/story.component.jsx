import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import useStoryFetching from "../../services/story.service.js";
import WebSocketService from "../../services/webSocket.service.js";
import { useServer } from "../../assets/context/server.context.js";
import Settings from "../../utils/setting.js";

function Story({ chapterId, title, numChapter }) {

  // ----- get server default -----
  const { selectedServer } = useServer();
  const [_selectedServer, _setSelectedServer] = useState(selectedServer);
  // ----- get server default end -----

  // ----- get data from API -----
  const [_chapterId, setChapterId] = useState(chapterId);
  const [_numChapter, setNumChapter] = useState(numChapter);

  const storyUrl = `/${_selectedServer}/story/${_chapterId}/${title}/${_numChapter}`;
  const { dataStory, loadingStory } = useStoryFetching(storyUrl);
  // ----- get data from API end -----

  // ----- get reading state from local storage -----
  useEffect(() => {
    const savedState =
      JSON.parse(localStorage.getItem("currentReadingState")) || [];
    if (Array.isArray(savedState)) {
      const currentStory = savedState.find((story) => story._title === title);
      if (currentStory) {
        setChapterId(currentStory._chapterId);
        setNumChapter(currentStory._numChapter);
      }
    }
  }, [title]);
  // ----- get reading state from local storage end -----

  // ----- save reading state to local storage -----
  useEffect(() => {
    const saveStoryState = () => {
      const savedStories =
        JSON.parse(localStorage.getItem("currentReadingState")) || [];

      const storiesArray = Array.isArray(savedStories) ? savedStories : [];

      const updatedStories = storiesArray.filter(
        (story) => story._title !== title
      );
      updatedStories.push({
        title: dataStory?.story_name,
        numChapter: dataStory?.chapter_name,
        _title: title,
        _chapterId: _chapterId,
        _numChapter: _numChapter,
      });

      // Remove oldest items if the array length exceeds 10
      while (updatedStories.length > 10) {
        updatedStories.shift();
      }

      localStorage.setItem(
        "currentReadingState",
        JSON.stringify(updatedStories)
      );
    };

    if (dataStory) {
      saveStoryState();
    }
  }, [_chapterId, _numChapter, title, dataStory]);

  // ----- save reading state to local storage end -----

  // ----- handle change color button server -----
  const [activeServer, setActiveServer] = useState(_selectedServer);

  const handlePluginClick = (pluginName) => {
    _setSelectedServer(pluginName);
    setActiveServer(pluginName);
  };
  // ----- handle change color button server end-----

  // const clearReadingState = () => {
  //   localStorage.removeItem('currentReadingState');
  // };

  // clearReadingState()
  
  // ----- get server plugin -----
  const [dataPlugins, setDataPlugins] = useState(null);
  const [error, setError] = useState(null);
  const [loadingPlugins, setLoading] = useState(true);

  useEffect(() => {
    const webSocketService = new WebSocketService("/api/plugins",15000,'server');
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

  // ----- get server plugin end -----

  // ----- setting -----
  const [settings, setSettings] = useState({
    backgroundColor: "#ffffff",
    fontSize: 26,
    fontFamily: "Palatino",
    width: 900,
  });

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings);
  };

  // ----- setting end -----

  // ----- modal -----
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  // ----- modal end -----

  // ----- handle next and previous chapter -----
  const handleNextChapter = () => {
    setChapterId((nextChapterId) => 
      (parseInt(nextChapterId) + 1 == dataStory.chapter_next) ? parseInt(nextChapterId)+1 : 
    (dataStory.chapter_next == null ? parseInt(nextChapterId) : dataStory.chapter_next));
    
    setNumChapter((nextNumChapter) => {
      let num = parseInt(nextNumChapter.split("-")[1]);
      num += 1;
      return "chuong-" + num;
    });
  };

  const handlePreviousChapter = () => {
    setChapterId((prevChapterId) =>
    (parseInt(prevChapterId) - 1 == dataStory.chapter_prev) ? parseInt(prevChapterId)-1 : 
    (dataStory.chapter_prev == null ? parseInt(prevChapterId) : dataStory.chapter_prev));
  
    setNumChapter((prevNumChapter) => {
      let num = parseInt(prevNumChapter.split("-")[1]);
      num = num > 1 ? num - 1 : 1;
      return "chuong-" + num;
    });
    };
  // ----- handle next and previous chapter end -----

  const navigationButtons = (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottom: "1px solid #13ABA2", paddingBottom: "10px"
      }}
    >
      <Button
        onClick={handlePreviousChapter}
        style={{
          backgroundColor: '#B3E2A7',
          color: '#737373',
        }}
      >
        <span style={{ fontSize: '16px', fontFamily: 'Arial, sans-serif', fontWeight: '600' }}>
          &larr; Chương trước
        </span>
      </Button>
      <div style={{ width: '40px' }} 
      />
      <Button
        onClick={handleNextChapter}
        style={{
          backgroundColor: '#80B9AD',
          color: 'white',
          marginLeft: '40px',
        }}
      >
        <span style={{ fontSize: '16px', fontFamily: 'Arial, sans-serif', fontWeight: '600' }}>
          Chương tiếp &rarr;
        </span>
      </Button>
    </div>
  );

  const [showNavigationButtons, setShowNavigationButtons] = useState(false);
  //scrolling up and down and show navigation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowNavigationButtons(true);
      } else {
        setShowNavigationButtons(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // ----- setting end -----

  return (
    <div>
      <div
        style={{
          borderWidth:"20px",
          borderColor:"#4D869C",
          backgroundColor: settings.backgroundColor,
          color: "black",
          fontSize: `${settings.fontSize}px`,
          fontFamily: settings.fontFamily,
          maxWidth: `${settings.width}px`,
          margin: "0 auto",
          marginTop: "100px",
          marginBottom: "50px",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            borderBottom: "1px solid #13ABA2",
            paddingBottom: "20px"
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
          >
            {loadingPlugins ? (
              <div>Loading...</div>
            ) : (
              Array.isArray(dataPlugins) &&
              dataPlugins.map((plugin) => (
                <Button
                  key={plugin.name}
                  onClick={() => handlePluginClick(plugin.name)}
                  style={{
                    margin: "5px",
                    backgroundColor: activeServer === plugin.name ? "#135D66" : "#4D869C",
                    color: "white",
                    display: "inline-block",
                    alignItems: "center",
                    textAlign: "center",
                    borderRadius: "15px",
                    fontSize:"18px"
                  }}
                >
                  {plugin.name}
                </Button>
              ))
            )}
          </div>
          <Button onClick={openModal} style={{
                    margin: "5px",
                    backgroundColor: "#BBE2EC",
                    display: "inline-block",
                    alignItems: "center",
                    borderRadius: "15px",
                  }} >
                <img
                  src={`${process.env.PUBLIC_URL}/images/edit.png`}
                  alt="Edit"
                  style={{ width: "30px", height: "30px", color:"white" }} // Adjust the size of the image
                />
          </Button>
        </div>

        <Modal isOpen={isOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Tuỳ chỉnh</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Settings currentSettings={settings} onSettingsChange={handleSettingsChange} />
            </ModalBody>
            <ModalFooter>
              <Button onClick={closeModal}>Đóng</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        
        {loadingStory ? (
          <Stack spacing={5}>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />

            {navigationButtons}
          </Stack>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            
            <h1>{dataStory ? dataStory.story_name : 'Không tìm thấy nội dung'}</h1>
            
            <h2 style={{borderBottom: "1px solid #13ABA2", paddingBottom: "10px"}}>{dataStory?.chapter_name}</h2>

            {navigationButtons}

            {_selectedServer === 'server1' ? (
              <div  dangerouslySetInnerHTML={{ __html: dataStory?.content }} />
            ) : (
              <div className="pre-wrapper" >
                <pre style={{ backgroundColor: settings.backgroundColor, color: 'black', fontSize: `${settings.fontSize}px`, fontFamily: settings.fontFamily, maxWidth: `${settings.width}px`, margin: '0 auto', padding: '20px' }}>{dataStory?.content}</pre>
              </div>
            )}
          </div>
        )}
      </div>
      {showNavigationButtons && (
        <div
          style={{
            position: 'sticky',
            bottom: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '20px auto',
            backgroundColor: 'transparent',
            padding: '0px',
            borderRadius: '10px',
            width: '80%',
            maxWidth: '450px',
          }}
        >
          {navigationButtons}
        </div>
      )}
    </div>
  );
}

export default Story;
