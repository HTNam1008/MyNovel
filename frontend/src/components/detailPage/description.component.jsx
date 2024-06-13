import React, { useState, useEffect } from 'react';

function StoryDescription({ description, maxLength, onToggle }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
    onToggle();
  };

  const truncatedDescription = description ? description.slice(0, maxLength) : '';

  useEffect(() => {
    onToggle();
  }, [showFullDescription, description]);

  return (
    <div className="story-description" style={{ minHeight: '400px', backgroundColor: 'transparent', padding: '20px', margin: "0px 40px 20px 40px", borderRadius: '5px', border: '1px solid #13ABA2' }}>
      <div dangerouslySetInnerHTML={{ __html: showFullDescription ? description : truncatedDescription }} />
      {description && description.length > maxLength && (
        <span onClick={toggleDescription} style={{ cursor: 'pointer', color: '#13ABA2', fontWeight: "600" }}>
          {showFullDescription ? 'Thu gọn' : '..Xem thêm'}
        </span>
      )}
    </div>
  );
}

export default StoryDescription;
