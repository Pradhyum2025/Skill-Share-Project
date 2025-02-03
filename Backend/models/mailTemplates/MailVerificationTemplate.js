export const varificationMailTemplate = (otp) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #4CAF50; text-align: center;">🔐 Email Verification Required</h2>

      <p>Dear User,</p>

      <p>Thank you for registering with us! To complete your signup process, please verify your email using the OTP below:</p>

      <h3 style="text-align: center; font-size: 24px; font-weight: bold; color: #333; background: #f4f4f4; padding: 10px; border-radius: 5px;">
        ${otp}
      </h3>

      <p>This OTP is valid for the next <strong>5 minutes</strong>. Please do not share it with anyone.</p>

      <p>If you didn’t request this, you can safely ignore this email.</p>

      <p>Best Regards,</p>
      <p style="text-align: center; font-weight: bold;">Skill Share</p>
    </div>
  `;
};

