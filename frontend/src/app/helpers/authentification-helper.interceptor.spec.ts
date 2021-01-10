import { TestBed } from '@angular/core/testing';

import { AuthentificationHelperInterceptor } from './authentification-helper.interceptor';

describe('AuthentificationHelperInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthentificationHelperInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthentificationHelperInterceptor = TestBed.inject(AuthentificationHelperInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
