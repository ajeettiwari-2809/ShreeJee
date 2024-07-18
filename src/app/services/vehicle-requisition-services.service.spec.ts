import { TestBed } from '@angular/core/testing';

import { VehicleRequisitionServicesService } from './vehicle-requisition-services.service';

describe('VehicleRequisitionServicesService', () => {
  let service: VehicleRequisitionServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleRequisitionServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
