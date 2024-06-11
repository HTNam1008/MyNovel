const fs = require("fs");
const path = require("path");
const serviceRegistry = require("./serviceRegistry");
const express = require("express");

let currentProxy = "";

const loadPlugins = (app) => {
  const pluginsPath = path.join(__dirname, "plugins");
  let plugins = [];

  const loadAllPlugins = () => {
    plugins = []; // Reset plugins array
    fs.readdirSync(pluginsPath).forEach((folder) => {
      const plugin = require(path.join(pluginsPath, folder));
      serviceRegistry.registerService(plugin.name, plugin);
      plugins.push({
        name: plugin.name,
        endpoint: `/${folder}`,
      });

      const router = express.Router();

      router.get("/search/story-update", (req, res) => plugin.getStoryUpdate(req, res));
      router.get("/search/story-new", (req, res) => plugin.getStoryNew(req, res));
      router.get("/search/:title", (req, res) => plugin.searchStory(req, res));
      router.get("/detail/:id", (req, res) => plugin.getStoryDetail(req, res));
      router.get("/chapters/:id", (req, res) => plugin.getStoryChapters(req, res));
      router.get("/story/:chapterId/:title/:numChapter", (req, res) => plugin.getStoryContent(req, res));
      router.get("/plugins", (req, res) => res.json({ data: plugins }));

      app.use(`/${folder}`, router);
    });
  };

  loadAllPlugins();

  // API để lấy danh sách plugins
  app.get('/api/plugins', (req, res) => {
    res.json({ data: plugins });
  });

  // Watch plugins folder for changes
  fs.watch(pluginsPath, (eventType, filename) => {
    if (filename && (eventType === 'rename' || eventType === 'change')) {
      loadAllPlugins();
    }
  });

  console.log("Plugins loaded");
};

module.exports = {
  loadPlugins,
  getCurrentProxy: () => currentProxy,
};
