const API_BASE_SSE_URL = import.meta.env.VITE_PUBLIC_API_SSE_URL || "";

/**
 * Singleton class for managing Server-Sent Events (SSE) connections
 */
class SSEInstance {
  private static instance: SSEInstance;
  private sse: EventSource | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private baseReconnectInterval = 3000;
  private maxReconnectDelay = 30000;
  private randomizationFactor = 0.5;
  private subscriptions: Map<string, Array<(event: MessageEvent) => void>> =
    new Map();

  /**
   * Gets the singleton instance of SSEInstance
   *
   * @returns {SSEInstance} The singleton instance
   */
  static getInstance(): SSEInstance {
    if (!SSEInstance.instance) {
      SSEInstance.instance = new SSEInstance();
    }
    return SSEInstance.instance;
  }

  /**
   * Subscribes to a specific SSE event
   *
   * @template T - The expected data type for the event
   * @param {string} event - The event name to subscribe to
   * @param {(data: T) => void} callback - Callback function that receives parsed event data
   * @returns {VoidFunction} Unsubscribe function - call to remove the event listener
   */
  subscribe<T>(event: string, callback: (data: T) => void) {
    const handler = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        callback(data);
      } catch {
        callback(event.data);
      }
    };

    if (!this.subscriptions.has(event)) {
      this.subscriptions.set(event, []);
    }

    this.subscriptions.get(event)!.push(handler);

    this.connect();
    if (this.sse && this.sse.readyState === EventSource.OPEN) {
      this.sse.addEventListener(event, handler);
    }

    return () => {
      if (this.sse) {
        this.sse.removeEventListener(event, handler);
      }

      const handlers = this.subscriptions.get(event);
      if (handlers) {
        this.subscriptions.set(
          event,
          handlers.filter((h) => h !== handler)
        );
        if (this.subscriptions.get(event)!.length === 0) {
          this.subscriptions.delete(event);
        }
      }
    };
  }

  /**
   * Checks if the SSE connection is currently open and active
   */
  isConnected() {
    return this.sse?.readyState === EventSource.OPEN;
  }

  /**
   * Closes the SSE connection and cleans up resources
   */
  close() {
    if (this.sse) {
      this.sse.close();
      this.subscriptions.clear();
      this.sse = null;
    }
  }

  /**
   * Establishes or returns existing SSE connection
   *
   * @returns {EventSource} The EventSource instance
   */
  private connect() {
    if (!this.sse) {
      this.sse = new EventSource(API_BASE_SSE_URL, {
        // withCredentials: true,
      });

      this.sse.onopen = () => {
        console.log(`✅ SSE connected`);
        this.reconnectAttempts = 0;
        this.restoreSubscriptions();
      };

      this.sse.onerror = (event) => {
        console.error("❌ SSE ошибка:", event);
        this.reconnect();
      };
    }
  }

  /**
   * Handles automatic reconnection with exponential backoff
   */
  private reconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error("❌ Max reconnect attempts reached. Closing connection.");
      this.close();
      return;
    }

    this.reconnectAttempts++;

    let delay = Math.min(
      this.baseReconnectInterval * Math.pow(2, this.reconnectAttempts),
      this.maxReconnectDelay
    );

    const jitter = (Math.random() - 0.5) * this.randomizationFactor * 2;
    delay *= 1 + jitter;

    setTimeout(() => {
      this.close();
      this.connect();
    }, delay);
  }

  /**
   * Restores all active subscriptions after reconnection
   */
  private restoreSubscriptions() {
    if (!this.sse) return;

    this.subscriptions.forEach((handlers, event) => {
      handlers.forEach((handler) => {
        this.sse!.addEventListener(event, handler);
      });
    });
  }
}

/**
 * Singleton instance of SSEInstance for global use
 */
export const sseInstance = SSEInstance.getInstance();
