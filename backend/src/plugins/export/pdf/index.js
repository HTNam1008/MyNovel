const PDFDocument = require('pdfkit');

const pdfExport = {
    name: 'pdf',
    exportStory: async (storyData,req, res) => {
        try {
            
            const data= storyData.data
            
            const doc = new PDFDocument({ size: 'A4', margin: 50 });

            // Load the Noto Sans font
            const fontPath = './src/public/fonts/NotoSans-Regular.ttf'; // Đảm bảo đường dẫn đúng đến file font
            doc.registerFont('NotoSans', fontPath);
            doc.font('NotoSans');

            // Pipe the document to a blob
            let buffers = [];
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => {
                let pdfData = Buffer.concat(buffers);
                res.writeHead(200, {
                    'Content-Length': Buffer.byteLength(pdfData),
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': `attachment;filename=xxx.pdf`,
                }).end(pdfData);
            });

            // Add title
            doc.fontSize(20).text(data[0].story_name, {
                align: 'center',
            }).moveDown(2);

            // Add table of contents
            doc.fontSize(15).text('Mục lục', {
                align: 'left',
            }).moveDown(1);

            data.forEach((chapter) => {
                doc.fontSize(12).text(`${chapter.chapter_name}`, {
                    align: 'left',
                    indent: 20,
                });
            });

            // Add chapters
            data.forEach((chapter) => {
                doc.addPage().fontSize(15).text(`${chapter.chapter_name}`, {
                    align: 'center',
                }).moveDown(1);

                doc.fontSize(12).text(chapter.content.replace(/<\/?[^>]+(>|$)/g, ""), {
                    align: 'left',
                    indent: 20,
                });
            });

            // Finalize PDF file
            doc.end();
        } catch (error) {
            console.error('Error exporting story:', error);
            res.status(500).json({ error: 'Error exporting story' });
        }
    },
};

module.exports = pdfExport;
