const baseURL = "https://dummy-1.hiublue.com/api";

class APIClient<T> {
  endPoint: string;
  requestInit?: RequestInit;

  constructor(endPoint: string, requestInit?: RequestInit) {
    this.endPoint = endPoint;
    this.requestInit = requestInit;
  }

  async get(): Promise<T> {
    const token = localStorage.getItem("token");

    // Construct the URL with the API key
    const url = new URL(`${baseURL}/${this.endPoint}`);
    const headers = new Headers(this.requestInit?.headers);

    headers.set("Content-Type", "application/json");
    headers.set("Authorization", `Bearer ${token}`);
    console.log("headers-xyz:", headers);

    // Merge any custom requestInit options with the defaults
    const options: RequestInit = {
      method: "GET",
      headers,
      ...this.requestInit,
    };

    const response = await fetch(url.toString(), options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Assuming the response data conforms to FetchResponse<T>
    return data;
  }
}

export default APIClient;
