import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { showError } from '../../utils/showError';
import { TranslationType, isErrorCode } from '../../i18n';
import env from '../../utils/env';

type Errors = keyof TranslationType['error'];

function hasMessage(x: unknown): x is { response: { data: { error: Errors } } } {
  return Boolean(
    typeof x === 'object' &&
      x &&
      'response' in x &&
      typeof x.response === 'object' &&
      x.response &&
      'data' in x.response &&
      typeof x.response.data === 'object' &&
      x.response.data &&
      'error' in x.response.data &&
      x.response.data.error &&
      typeof x.response.data.error === 'string' &&
      isErrorCode(x.response.data.error),
  );
}

class HttpService {
  private axs: AxiosInstance;
  constructor() {
    this.axs = axios.create({
      baseURL: env.backendUrl,
    });
  }
  private getHeaders() {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    return { Authorization: 'Basic ' + btoa((id ?? 0) + ':' + (token ?? 0)) };
  }

  private catchError(e: unknown) {
    if (hasMessage(e)) showError(e.response.data.error);
    else showError('500');
    console.log(e);
    return null;
  }

  async post(url: string, data?: object, config?: AxiosRequestConfig) {
    try {
      return await this.axs.post(url, data, {
        headers: this.getHeaders(),
        ...config,
      });
    } catch (e) {
      return this.catchError(e);
    }
  }
  async get(url: string, config?: AxiosRequestConfig) {
    try {
      return await this.axs.get(url, {
        headers: this.getHeaders(),
        ...config,
      });
    } catch (e) {
      return this.catchError(e);
    }
  }
  async patch(url: string, data?: object, config?: AxiosRequestConfig) {
    try {
      return await this.axs.patch(url, data, {
        headers: this.getHeaders(),
        ...config,
      });
    } catch (e) {
      return this.catchError(e);
    }
  }

  async delete(url: string, config?: AxiosRequestConfig) {
    try {
      return await this.axs.delete(url, {
        headers: this.getHeaders(),
        ...config,
      });
    } catch (e) {
      return this.catchError(e);
    }
  }
}

const httpService = new HttpService();

export default httpService;
