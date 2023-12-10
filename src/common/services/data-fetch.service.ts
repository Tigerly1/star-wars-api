// src/common/services/data-fetch.service.ts

import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class DataFetchService {
  async fetchAllData<T>(baseUrl: string): Promise<T[]> {
    let currentPage = 1;
    let allData: T[] = [];
    let morePagesAvailable = true;

    while (morePagesAvailable) {
      const response = await axios.get(`${baseUrl}?page=${currentPage}`);
      const data: T[] = response.data.results;
      allData = allData.concat(data);

      if (response.data.next) {
        currentPage++;
      } else {
        morePagesAvailable = false;
      }
    }

    return allData;
  }
}
