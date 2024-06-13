function vietnameseToSlug(str) {
    // Chuyển đổi chuỗi thành chữ thường
    str = str.toLowerCase();
  
    // Loại bỏ các ký tự đặc biệt, ký tự có dấu
    const fromChars =
      "àáãạảăằắẵặẳâầấẫậẩèéẽẹẻêềếễệểìíĩịỉòóõọỏôồốỗộổơờớỡợởùúũụủưừứữựửỳýỹỵỷđ";
    const toChars =
      "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd";
  
    for (let i = 0; i < fromChars.length; i++) {
      str = str.replace(new RegExp(fromChars.charAt(i), "g"), toChars.charAt(i));
    }
  
    // Thay thế khoảng trắng bằng dấu gạch ngang
    return str.replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, '').replace(/^-+|-+$/g, '');
  }
  
  function getSubstringBeforeColon(inputString) {
    // Tìm vị trí của dấu ":"
    const colonIndex = inputString.indexOf(":");
  
    // Nếu không tìm thấy dấu ":" trong chuỗi
    if (colonIndex === -1) {
      // Trả về chuỗi ban đầu
      return inputString.trim();
    }
  
    // Lấy chuỗi con từ đầu đến vị trí của dấu ":"
    const trimmedSubstring = inputString.substring(0, colonIndex).trim();
    return trimmedSubstring;
  }

export { vietnameseToSlug, getSubstringBeforeColon };