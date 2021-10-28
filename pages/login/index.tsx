import EmailConfirmComponent from '../../component/EmailConfirmComponent';
import LoginComponent from '../../component/LoginComponent';
import { defaultContainer } from '../../styles';

export default function Page() {
  return (
    <div style={defaultContainer}>
      <LoginComponent />
      <EmailConfirmComponent />
    </div>
  );
}
