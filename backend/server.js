const app = require("./src/app");
const { loadPlugins } = require('./src/pluginLoader');

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
    console.log(`MyNovel started on port ${PORT}`);
    loadPlugins(app); // Gọi loadPlugins sau khi server đã start
});

// process.on('SIGINT', () => {
//     console.log('Received SIGINT. Closing MyNovel...');
//     server.close(() => {
//         console.log('MyNovel has been closed');
//     });
// });
let isClosing = false;

process.on('SIGINT', () => {
    if (isClosing) return;
    isClosing = true;
    console.log('Received SIGINT. Closing MyNovel...');
    server.close(() => {
        console.log('MyNovel has been closed');
        process.exit(0); // Đảm bảo quá trình kết thúc sau khi server đóng
    });
});