import React, { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import useStoryFetching from "../../services/story.service.js";
import usePolling from "../../services/usePooling.service.js";

function Story({ chapterId, title, numChapter }) {
  const [selectedServer, setSelectedServer] = useState('server1'); // Mặc định là server1

  // Cập nhật URL cho useStoryFetching dựa trên selectedServer
  const storyUrl = `/${selectedServer}/story/${chapterId}/${title}/${numChapter}`;
  const { dataStory, loadingStory } = useStoryFetching(storyUrl);

  useEffect(() => {
  }, [selectedServer, chapterId, title, numChapter]);

  const handlePluginClick = (pluginName) => {
    setSelectedServer(pluginName); // Cập nhật server được chọn
  };

  const { data: dataPlugins, error } = usePolling('/api/plugins');
  if (error) {
    return <div>Error fetching plugins: {error.message}</div>;
  }

  const loadingPlugins = !dataPlugins; // Nếu dataPlugins chưa có dữ liệu, coi như đang loading

  return (
    <div style={{ color: 'white' }}>
      {/* Hiển thị nút chọn server */}
      <div>
        {loadingPlugins ? (
          <div>Loading...</div>
        ) : (
          Array.isArray(dataPlugins) && dataPlugins.map((plugin) => (
            <Button key={plugin.name} onClick={() => handlePluginClick(plugin.name)}>
              {plugin.name}
            </Button>
          ))
        )}
      </div>
      {/* Hiển thị nội dung truyện */}
      {loadingStory ? (
        <div>Loading story...</div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: dataStory.content }} />
      )}
    </div>
  );
}

export default Story;
