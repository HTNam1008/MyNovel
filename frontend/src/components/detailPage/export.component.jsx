import React, { useState, useEffect } from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import axios from 'axios';
import fetchExportPlugins from '../../services/export.service.js'; // Hàm gọi API để lấy danh sách plugins export
import { useServer } from '../../assets/context/server.context.js';

const ExportButton = ({ data, title }) => {
    const { selectedServer } = useServer();
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

            const fileExtension = plugin.name.toLowerCase().replace(/\s+/g, '_'); // Convert plugin name to a file extension
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${data.title}.${fileExtension}`);
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
        <div style={{display:"flex", height:"50px", borderColor:"#0d6efd"}}>
            <Dropdown  
                      onSelect={(eventKey) => setSelectedPlugin(exportPlugins.find(p => p.name === eventKey))}>
                <Dropdown.Toggle variant="success" id="dropdown-basic" 
                                 style={{borderTopLeftRadius: '30px', 
                                        borderBottomLeftRadius: '30px', 
                                        borderTopRightRadius: '0', 
                                        borderBottomRightRadius: '0',
                                        backgroundColor:"#13ABA2",
                                        height:"50px",
                                        borderColor:"#0d6efd"}}>
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
                style={{borderTopLeftRadius: '0', borderBottomLeftRadius: '0', borderTopRightRadius: '30px', borderBottomRightRadius: '30px', borderColor:"#0d6efd",backgroundColor:"#13ABA2" }}
                onClick={() => handleExport(selectedPlugin)}
                disabled={!selectedPlugin}
            
            >
                Export
            </Button>
        </div>
    );
};

export default ExportButton;
