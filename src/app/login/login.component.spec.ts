import { LoginComponent} from "./login.component";
import { of } from 'rxjs';

describe('LoginComponent', () => {
  const mockApiService = {
    login: jest.fn()
    } as any;
    const mockAuthService = {} as any;
    const component = new LoginComponent(mockApiService, mockAuthService);

  test('empty data should throw error', () => {
    const response = {
      status: 400
    };
    mockApiService.login.mockReturnValue(of(response));

    expect(component.loginStatus).toBeFalsy();
  });

  

});