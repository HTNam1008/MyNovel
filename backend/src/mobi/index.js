const fs = require('fs');
const path = require('path');
const EPub = require('epub-gen'); // Một thư viện để tạo file EPUB

const epubExport = {
  name: 'mobi',
  exportStory: async (storyData, req, res) => {
    try {
      const data = storyData.data;
      const outputPath = path.join(__dirname, `${data[0].story_name}.epub`);

      const options = {
        title: data[0].story_name,
        author: 'Unknown', // Bạn có thể thay đổi theo dữ liệu thực tế
        content: data.map(chapter => ({
          title: chapter.chapter_name,
          data: chapter.content.replace(/<\/?[^>]+(>|$)/g, "") // Loại bỏ các thẻ HTML nếu cần
        }))
      };

      new EPub(options, outputPath).promise.then(() => {
        res.download(outputPath, `${data[0].story_name}.epub`, (err) => {
          if (err) {
            console.error('Error downloading EPUB:', err);
            res.status(500).json({ error: 'Error exporting story' });
          } else {
            console.log('EPUB downloaded:', outputPath);
          }
        });
      }).catch(err => {
        console.error('Error generating EPUB:', err);
        res.status(500).json({ error: 'Error exporting story' });
      });
    } catch (error) {
      console.error('Error exporting story:', error);
      res.status(500).json({ error: 'Error exporting story' });
    }
  },
};

module.exports = epubExport;
