const fs = require("fs");
const path = require("path");
const serviceRegistry = require("./serviceRegistry");
const express = require("express");

let currentProxy = "";

const loadPlugins = (app) => {
  const pluginsPathServer = path.join(__dirname, "plugins/server");
  let pluginsServer = [];

  const pluginsPathExport = path.join(__dirname, "plugins/export");
  let pluginsExport = [];

  const loadAllPluginsServer = () => {
    pluginsServer = []; // Reset plugins array

    fs.readdirSync(pluginsPathServer).forEach((folder) => {
      
      const plugin = require(path.join(pluginsPathServer, folder));
      serviceRegistry.registerService(pluginsPathServer, plugin);
      pluginsServer.push({
        name: plugin.name,
        endpoint: `/${folder}`,
      });

      const router = express.Router();

      router.get("/search/story-update", (req, res) => plugin.getStoryUpdate(req, res));
      router.get("/search/story-new", (req, res) => plugin.getStoryNew(req, res));
      router.get("/search/:title", (req, res) => plugin.searchStory(req, res));
      router.get("/detail/:id/:title", (req, res) => plugin.getStoryDetail(req, res));
      router.get("/chapters/:id/:title", (req, res) => plugin.getStoryChapters(req, res));
      router.get("/story/:chapterId/:title/:numChapter", (req, res) => plugin.getStoryContent(req, res));


      app.use(`/${folder}`, router);
    });
  };


  loadAllPluginsServer();

  const loadAllPluginsExport = () => {
    pluginsExport = []; // Reset plugins array

    fs.readdirSync(pluginsPathExport).forEach((folder) => {
      const plugin = require(path.join(pluginsPathExport, folder));
      serviceRegistry.registerService(pluginsPathExport, plugin);
      pluginsExport.push({
        name: plugin.name,
        endpoint: `/${folder}`,
      });

      const router = express.Router();
      
      // router.post("/:server/:id", (req, res) => plugin.exportStory(req, res));
      router.post("/:server/:id/:title", async (req, res) => {
        // Kiểm tra nếu tên folder của plugin export trùng với tham số :server
          try {
            // Lấy dữ liệu từ plugin server
            const pluginServer = require(path.join(pluginsPathServer, req.params.server));
            const storyData = await pluginServer.getStoryDownload(req, res);
            // Sau khi có dữ liệu, gọi hàm exportStory từ plugin export
            await plugin.exportStory(storyData, req, res);
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error exporting story" });
          }
      });
      // app.use(`/${folder}`, router);
      app.use(`/${folder}`,router)
    });
  };


  loadAllPluginsServer();

  loadAllPluginsExport();

  // API để lấy danh sách plugins server
  app.get('/api/plugins', (req, res) => {
    res.json({ server: {data: pluginsServer}, export:{data: pluginsExport}});
  });

  // API để lấy danh sách plugins export
  // app.get('/api/plugins', (req, res) => {
  //   res.json({ data: pluginsExport });
  // });
  
  // Watch plugins server folder for changes
  fs.watch(pluginsPathServer, (eventType, filename) => {
    if (filename && (eventType === 'rename' || eventType === 'change')) {
      loadAllPluginsServer();
    }
  });

  // Watch plugins export folder for changes
  fs.watch(pluginsPathExport, (eventType, filename) => {
    if (filename && (eventType === 'rename' || eventType === 'change')) {
      loadAllPluginsExport();
    }
  });

};

module.exports = {
  loadPlugins,
  getCurrentProxy: () => currentProxy,
};
