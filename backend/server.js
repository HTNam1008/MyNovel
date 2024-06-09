const app = require("./src/app");
const { loadPlugins } = require('./src/pluginLoader');

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
    console.log(`MyNovel started on port ${PORT}`);
    loadPlugins(app); // Gọi loadPlugins sau khi server đã start
});

process.on('SIGINT', () => {
    server.close(() => {
        console.log('MyNovel has been closed');
    });
});
