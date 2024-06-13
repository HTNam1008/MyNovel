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
} from "@chakra-ui/react";
import useStoryFetching from "../../services/story.service.js";
import WebSocketService from "../../services/webSocket.service.js";
import { useServer } from "../../assets/context/server.context.js";
import Settings from "../../utils/setting.js";
import { useTheme } from "../../assets/context/theme.context.js";

function Story({ chapterId, title, numChapter }) {
  const { selectedServer } = useServer();
  const [_selectedServer, _setSelectedServer] = useState(selectedServer);
  const [_chapterId, setChapterId] = useState(chapterId);
  const [_numChapter, setNumChapter] = useState(numChapter);

  const storyUrl = `/${_selectedServer}/story/${_chapterId}/${title}/${_numChapter}`;
  const { dataStory, loadingStory } = useStoryFetching(storyUrl);

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

  // ----- save reading state to local storage -----

  const [activeServer, setActiveServer] = useState(_selectedServer);

  const handlePluginClick = (pluginName) => {
    _setSelectedServer(pluginName);
    setActiveServer(pluginName);
  };

  // const clearReadingState = () => {
  //   localStorage.removeItem('currentReadingState');
  // };
  // clearReadingState()
  // ----- get server plugin -----
  const [dataPlugins, setDataPlugins] = useState(null);
  const [error, setError] = useState(null);
  const [loadingPlugins, setLoading] = useState(true);

  useEffect(() => {
    const webSocketService = new WebSocketService("/api/plugins");
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
      let num = parseInt(prevNumChapter.split("-")[1]);
      num += 1;
      return "chuong-" + num;
    });
  };

  const handlePreviousChapter = () => {
    setChapterId((prevChapterId) =>
      parseInt(prevChapterId) > 1 ? parseInt(prevChapterId) - 1 : 1
    );
    setNumChapter((prevNumChapter) => {
      let num = parseInt(prevNumChapter.split("-")[1]);
      num = num > 1 ? num - 1 : 1;
      return "chuong-" + num;
    });
  };

  const [showNavigationButtons, setShowNavigationButtons] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY != lastScrollY) {
        setShowNavigationButtons(true);
        const timer = setTimeout(() => {
          setShowNavigationButtons(false);
        }, 4000); // Hide the buttons after 3 seconds

        return () => clearTimeout(timer);
      } else {
        setShowNavigationButtons(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navigationButtons = (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <Button
        onClick={handlePreviousChapter}
        style={{
          backgroundColor: "#D3EBCD",
          color: "#737373",
          marignRight: "20px",
        }}
      >
        <span style={{ fontSize: "20px" }}>&larr;</span> Chương trước
      </Button>
      <Button
        onClick={handleNextChapter}
        style={{
          backgroundColor: "#80CEB1",
          color: "white",
          marignLeft: "20px",
        }}
      >
        <span style={{ fontSize: "20px" }}>Chương tiếp</span> &rarr;
      </Button>
    </div>
  );

  // ----- setting end -----

  return (
    <div
      style={{
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
                  backgroundColor:
                    activeServer === plugin.name ? "#80CEB1" : "#FFFF00",
                  color: "black",
                  display: "inline-block",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                {plugin.name}
              </Button>
            ))
          )}
        </div>
        <Button onClick={openModal}>Hiển thị tùy chỉnh</Button>
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1>{dataStory ? dataStory.story_name : 'Không tìm thấy nội dung'}</h1>
          <h2>{dataStory?.chapter_name}</h2>
          {navigationButtons}

          {_selectedServer === 'server1' ? (
            <div dangerouslySetInnerHTML={{ __html: dataStory?.content }} />
          ) : (
            <div className="pre-wrapper" >
              <pre style={{ backgroundColor: settings.backgroundColor, color: 'black', fontSize: `${settings.fontSize}px`, fontFamily: settings.fontFamily, maxWidth: `${settings.width}px`, margin: '0 auto', padding: '20px' }}>{dataStory?.content}</pre>
            </div>
          )}
        </div>
      )}

      {showNavigationButtons && navigationButtons}
    </div>
  );
}

export default Story;
