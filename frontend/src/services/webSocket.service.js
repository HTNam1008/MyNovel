class WebSocketService {
  constructor(url, interval = 15000,namePlugins) {
    if (!WebSocketService.instance || WebSocketService.instance?.namePlugins !== namePlugins) {
      this.url = url;
      this.interval = interval;
      this.data = null;
      this.error = null;
      this.loading = false;
      this.namePlugins = namePlugins;
      WebSocketService.instance = this;
    }
    return WebSocketService.instance;
  }

  fetchData = async () => {
    this.setLoading(true);
    try {
      const response = await fetch(this.url);
      const responseData = await response.json();

      this.setData(responseData[this.namePlugins].data);

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

    this.intervalId = setInterval(() => this.fetchData(), this.interval); // Polling interval
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
