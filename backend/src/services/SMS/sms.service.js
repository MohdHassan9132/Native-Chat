class SMSService {
    async sendSMS({
        otp,
        phoneNumber
    }) {
        const res = await fetch(
            'https://api.textbee.dev/api/v1/gateway/send-sms',
            {
                method: 'POST',
                headers: {
                    'x-api-key': process.env.TEXTBEE_API_KEY,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    deviceId: process.env.DEVICE_ID,
                    recipients: [`${phoneNumber}`],
                    message: `Your Native Chat Verification OTP is ${otp}.`,
                }),
            }
        )

        console.log(await res.json())
        return true
    }
}

export const smsService = new SMSService()