import { API_ROUTES } from "@/lib/constants";

class HttpClient {
  private isRefreshing = false;

  async fetch<T>(url: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (response.status === 401 && !this.isRefreshing) {
      const refreshed = await this.tryRefresh();
      if (refreshed) {
        return this.fetch<T>(url, options);
      }
    }

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      throw { message: body.message || "Error desconocido", status: response.status };
    }

    return response.json();
  }

  private async tryRefresh(): Promise<boolean> {
    this.isRefreshing = true;
    try {
      const response = await fetch(API_ROUTES.REFRESH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      return response.ok;
    } catch {
      return false;
    } finally {
      this.isRefreshing = false;
    }
  }
}

export const httpClient = new HttpClient();
