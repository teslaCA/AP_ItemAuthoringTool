/*
 * Copyright 2017 Regents of the University of California.
 *
 * Licensed under the Educational Community License, Version 2.0 (the "license");
 * you may not use this file except in compliance with the License. You may
 * obtain a copy of the license at
 *
 * https://opensource.org/licenses/ECL-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {inject, TestBed} from "@angular/core/testing";

import {ItemTypeService} from "./item-type.service";

describe('ItemTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ItemTypeService
      ]
    });
  });

  it('should be created', inject([ItemTypeService], (service: ItemTypeService) => {
    expect(service).toBeTruthy();
  }));
});
