class WebSocketService {
  constructor(url, interval = 15000) {
    if (!WebSocketService.instance) {
      this.url = url;
      this.interval = interval;
      this.data = null;
      this.error = null;
      this.loading = false;
      WebSocketService.instance = this;
    }
    return WebSocketService.instance;
  }

  fetchData = async () => {
    this.setLoading(true);
    try {
      const response = await fetch(this.url);
      const responseData = await response.json();
      this.setData(responseData.data);
      this.setLoading(false);
      // Gọi hàm callback khi có dữ liệu mới được cập nhật
      if (this.onDataUpdateCallback) {
        this.onDataUpdateCallback(this.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setError(error);
      this.setLoading(false);
      // Gọi hàm callback khi có lỗi xảy ra
      if (this.onErrorHandler) {
        this.onErrorHandler(error);
      }
    }
  };

  startPolling = () => {
    this.fetchData(); // Fetch data immediately on start

    this.intervalId = setInterval(this.fetchData, this.interval); // Polling interval
  };

  stopPolling = () => {
    clearInterval(this.intervalId); // Stop polling
  };

  setData = (data) => {
    this.data = data;
  };

  setError = (error) => {
    this.error = error;
  };

  setLoading = (loading) => {
    this.loading = loading;
  };

  // Đăng ký hàm callback cho việc cập nhật dữ liệu
  setDataUpdateHandler = (callback) => {
    this.onDataUpdateCallback = callback;
  };

  // Đăng ký hàm callback cho việc xử lý lỗi
  setErrorHandler = (callback) => {
    this.onErrorHandler = callback;
  };
}

export default WebSocketService;

// class WebSocketService {
//   constructor(url) {
//     this.url = url;
//     this.ws = null;
//     this.onDataUpdateCallback = null;
//     this.onErrorHandler = null;
//   }

//   connect() {
//     this.ws = new WebSocket(this.url);

//     this.ws.onopen = () => {
//       console.log("WebSocket connection opened");
//     };

//     this.ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       if (this.onDataUpdateCallback) {
//         this.onDataUpdateCallback(data);
//       }
//     };

//     this.ws.onerror = (error) => {
//       console.error("WebSocket error:", error);
//       if (this.onErrorHandler) {
//         this.onErrorHandler(error);
//       }
//     };

//     this.ws.onclose = () => {
//       console.log("WebSocket connection closed");
//     };
//   }

//   disconnect() {
//     if (this.ws) {
//       this.ws.close();
//     }
//   }

//   setDataUpdateHandler(callback) {
//     this.onDataUpdateCallback = callback;
//   }

//   setErrorHandler(callback) {
//     this.onErrorHandler = callback;
//   }
// }

// export default WebSocketService;

