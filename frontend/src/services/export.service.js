import axios from 'axios';

const fetchExportPlugins = async () => {
    try {
        const response = await axios.get('/api/plugins/export');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching export plugins:', error);
        return [];
    }
};

export default fetchExportPlugins;
