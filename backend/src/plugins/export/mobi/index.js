const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const CloudConvert = require('cloudconvert');

const CLOUDCONVERT_API_KEY = process.env.CLOUDCONVERT_API_KEY || "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZmE0ZTFkYmYwZjA1OWM5ZWE1OWUyYzMxNmMzMjRhNDY5ZTY5N2RhMzdlNWUyNmU0Y2RmYjllOTY4ODk3YjFmMTFiMjMxZGJjNTVhZmYwM2YiLCJpYXQiOjE3MTgyODY5MTcuMjc5Njc1LCJuYmYiOjE3MTgyODY5MTcuMjc5Njc2LCJleHAiOjQ4NzM5NjA1MTcuMjc2MTY3LCJzdWIiOiI2ODY5OTkxNSIsInNjb3BlcyI6WyJ0YXNrLnJlYWQiLCJ0YXNrLndyaXRlIl19.DJm0YAknWgLiUi4SYKmNb9l0PjkJ2cKJ0W9u904YUcLAShZpWq0Os-4_O2vjQygCdE6gitfYMjkt6UgvChF7GuikSiNrHwDQAlyzgyhROEHzMhXzWE81XbTCE05MfngE73QSHz2ATNFUoduoQvFMveXJ-_2xHPEIoeL0vpipbGB-Y-p12RSPUTh4jC9aBJLUQPT3TkftDzcxTFllbEKc7axI5U-tW08SSLK4GFYQVIhOv_7c3AeECY1_UVZXWTvijjpa7_cpuc3M2yWIlN5EnLz1l1Ef3tTcmhzdjS6qiAt2DJGqzEgKb2TlceYvfxr0Tq3X007UX1chsm4nPah-HCtUtV1qV65amGHei02n_JDWborIBT2utkIUfvqRtRkmdnWXPJwvJeeCr_ECfGhqGtD5VXCurm0YNMCDDdmSX7j1LO4alW16EITf4vUG_6U6cMgGVW_8M8F28ZlZWf4N01yI9bMXLWXOoM8Dz7p256s37J9VW_vzNL3TzHBE-sPViBmEZ66Gib9z624WIHW1CS3593330a4xlqC2GIECXdyVbcc0zjXyeHnLL2zmIsHETwLj36r53b6YCJrQ7nLmUfhCZeFcMvNs0ZYb4OCXIPq3P17nS18O_IKRxPRqUTWkXWHx-yajJ5alJomyvlotTews45m04mh3BFzij2-bZwY";

const mobiExport = {
    name: 'mobi',
    exportStory: async (storyData, req, res) => {
      try {
        const data = storyData.data;
        const storyName = data[0].story_name;
        const htmlFilePath = path.join(__dirname, `${storyName}.html`);
  
        // Tạo file HTML từ nội dung
        const htmlContent = data.map(chapter => `
          <h1>${chapter.chapter_name}</h1>
          <div>${chapter.content}</div>
        `).join('');
  
        fs.writeFileSync(htmlFilePath, `<h1>${storyName}</h1>${htmlContent}`);
  
        // Khởi tạo CloudConvert
        const cloudConvert = new CloudConvert(CLOUDCONVERT_API_KEY);
  
        // Tạo tác vụ chuyển đổi
        let job = await cloudConvert.jobs.create({
          tasks: {
            'upload-html': {
              operation: 'import/upload'
            },
            'convert-to-mobi': {
              operation: 'convert',
              input: 'upload-html',
              output_format: 'mobi'
            },
            'export-mobi': {
              operation: 'export/url',
              input: 'convert-to-mobi'
            }
          }
        });
  
        const uploadTask = job.tasks.filter(task => task.name === 'upload-html')[0];
        const uploadUrl = uploadTask.result.form.url;
        const uploadParameters = uploadTask.result.form.parameters;
  
        // Tải file HTML lên CloudConvert
        const formData = new FormData();
        for (const key in uploadParameters) {
          formData.append(key, uploadParameters[key]);
        }
        formData.append('file', fs.createReadStream(htmlFilePath));
  
        await axios.post(uploadUrl, formData, {
          headers: {
            ...formData.getHeaders()
          }
        });
  
        // Lấy kết quả chuyển đổi
        job = await cloudConvert.jobs.wait(job.id);
        const exportTask = job.tasks.filter(task => task.name === 'export-mobi')[0];
        const mobiUrl = exportTask.result.files[0].url;
  
        // Tải file MOBI
        const mobiResponse = await axios.get(mobiUrl, { responseType: 'stream' });
  
        res.setHeader('Content-Disposition', `attachment; filename="xxx.mobi"`);
        mobiResponse.data.pipe(res);
  
        // Xóa file HTML tạm thời
        fs.unlinkSync(htmlFilePath);
  
      } catch (error) {
        console.error('Error exporting story:', error);
        res.status(500).json({ error: 'Error exporting story' });
      }
    },
  };
  
  module.exports = mobiExport;
