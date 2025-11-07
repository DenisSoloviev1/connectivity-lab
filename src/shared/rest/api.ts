import { apiInstance } from "./api-instance";
import { GetParams, GetResponse } from "./types";

/**
 * REST API client for posts resource operations
 * Implements Singleton pattern to provide centralized access to posts endpoints
 */
class RestApi {
  readonly baseUrl = "posts";
  private static instance: RestApi;

  /**
   * Gets the singleton instance of RestApi
   * Ensures only one instance exists throughout the application
   */
  static getInstance(): RestApi {
    if (!RestApi.instance) {
      RestApi.instance = new RestApi();
    }

    return RestApi.instance;
  }

  /**
   * Retrieves all posts from the API
   * Performs GET request to the posts endpoint
   *
   * @param {GetParams} params - Request parameters
   * @param {AbortSignal} [params.signal] - Optional abort signal for request cancellation
   * @returns {Promise<GetResponse>} Promise resolving to posts data response
   */
  get({ signal }: GetParams) {
    return apiInstance<GetResponse>({
      path: `${this.baseUrl}`,
      signal,
    });
  }
}

/**
 * Singleton instance of RestApi
 */
export const restApi = RestApi.getInstance();
