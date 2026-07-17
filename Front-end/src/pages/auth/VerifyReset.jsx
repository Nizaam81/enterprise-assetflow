
import OTPVerification from '../../components/OTP'

export default function VerifyReset() {
  return (
    <OTPVerification
      flowType="reset"
      destination="jordan@company.com"
      onVerify={(code) => api.verifyResetOtp(code)}
      onResend={() => api.resendResetOtp()}
    />
  )
}