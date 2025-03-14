/*
 * Copyright (c) 2023-2025 Orange. All rights reserved.
 * This software is distributed under the BSD 3-Clause-clear License, the text of which is available
 * at https://spdx.org/licenses/BSD-3-Clause-Clear.html or see the "LICENSE" file for more details.
 */

import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'khiops-visualization';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  localFileContents: any;
  linkFile: string = '';

  @ViewChild('visualizationComponent', {
    static: false,
  })
  visualizationComponent?: ElementRef<HTMLElement>;

  @ViewChild('covisualizationComponent', {
    static: false,
  })
  covisualizationComponent?: ElementRef<HTMLElement>;

  showKhiopsVisualization = false;
  showKhiopsCovisualization = false;
  urlParam: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.urlParam = params.get('url');
      if (this.urlParam) {
        this.getDataFromUrl(this.decodeRawKhiopsString(this.urlParam));
      }
    });
  }

  getDataFromUrl(urlParamFile: string) {
    if (!urlParamFile) return;
    fetch(urlParamFile)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => this.displayKhiops(json))
      .catch((err) => console.error(`Fetch problem: ${err.message}`));
  }

  displayKhiops(fileData?: any) {
    if (fileData || this.localFileContents) {
      if (!fileData) {
        fileData = this.localFileContents;
      }
      try {
        const jsonData = fileData;
        if (jsonData.tool === 'Khiops') {
          this.showKhiopsVisualization = true;
          setTimeout(() => {
            //@ts-ignore
            this.visualizationComponent?.nativeElement.setConfig({
              showProjectTab: false,
            });
            //@ts-ignore
            this.visualizationComponent?.nativeElement.setDatas(jsonData);
          });
        } else if (jsonData.tool === 'Khiops Coclustering') {
          this.showKhiopsCovisualization = true;
          setTimeout(() => {
            //@ts-ignore
            this.covisualizationComponent?.nativeElement.setDatas(jsonData);

            //@ts-ignore
            this.covisualizationComponent?.nativeElement.setConfig({
              showProjectTab: false,
            });
          });
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }
  }

  changeLocalFile(event: any) {
    var file = event.target.files[0];
    setTimeout(() => {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.localFileContents = JSON.parse(e.target?.result?.toString()!);
      };
      reader.readAsText(file);
    });
  }

  openFromUrl() {
    this.getDataFromUrl(this.decodeRawKhiopsString(this.linkFile));
  }

  openFromFile() {
    this.displayKhiops();
  }

  close() {
    this.showKhiopsVisualization = false;
    this.showKhiopsCovisualization = false;
  }

  decodeRawKhiopsString(fullUrl?: string) {
    let fullURL;
    if (!fullUrl) {
      fullURL = window.location.pathname;
    } else {
      fullURL = fullUrl;
    }
    let fullURLIndex = fullURL.indexOf('https%3A%2F%2F');
    if (fullURLIndex !== -1) {
      let s3URL = fullURL.slice(fullURLIndex);
      let decodedS3URL = decodeURIComponent(s3URL);
      return decodedS3URL;
    } else {
      return fullURL;
    }
  }
}
