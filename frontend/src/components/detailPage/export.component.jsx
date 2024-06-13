import React, { useState, useEffect } from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import axios from 'axios';
import fetchExportPlugins from '../../services/export.service.js'; // Hàm gọi API để lấy danh sách plugins export
import { useServer } from '../../assets/context/server.context.js';
const ExportButton = ({ data,title }) => {
    const {selectedServer} = useServer();
    const [exportPlugins, setExportPlugins] = useState([]);
    const [selectedPlugin, setSelectedPlugin] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const plugins = await fetchExportPlugins();
            setExportPlugins(plugins);
        };
        fetchData();
    }, []);

    const handleExport = async (plugin) => {
        if (!plugin) {
            console.error('No plugin selected');
            return;
        }

        try {
            const response = await axios.post(`${plugin.endpoint}/${selectedServer}/${data.id}/${title}`, null, {
                responseType: 'blob',
            });


            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${data.title}.pdf`);
            document.body.appendChild(link);
            link.click();

            // Clean up and revoke the object URL
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error exporting file:', error);
        }
    };

    return (
        <div>
            <Dropdown onSelect={(eventKey) => setSelectedPlugin(exportPlugins.find(p => p.name === eventKey))}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {selectedPlugin ? `Export as ${selectedPlugin.name}` : 'Choose export format'}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {exportPlugins.map((plugin) => (
                        <Dropdown.Item key={plugin.name} eventKey={plugin.name}>
                            {plugin.name}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            <Button
                onClick={() => handleExport(selectedPlugin)}
                disabled={!selectedPlugin}
                style={{ marginLeft: '10px' }}
            >
                Export
            </Button>
        </div>
    );
};

export default ExportButton;