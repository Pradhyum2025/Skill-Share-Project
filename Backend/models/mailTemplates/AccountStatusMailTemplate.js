export const AccountStatusMailTemplate = (instructorName, adminName, organizationName, accountStatus, adminEmail) =>{
    // Determine color based on account status
    const statusColor = accountStatus === "Active" ? "#4CAF50" : "#FF0000"; // Green for Active, Red for Deactive

    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: ${statusColor}; text-align: center;">📢 Account Status Updated</h2>

      <p>Dear ${instructorName},</p>

      <p>Your instructor account at <strong>${organizationName}</strong> has been updated by Admin <strong>${adminName}</strong>.</p>

      <h3 style="text-align: center; color: ${statusColor}; font-size: 20px; background: #f4f4f4; padding: 10px; border-radius: 5px;">
        Account Status: ${accountStatus}
      </h3>

      <p>
        ${
          accountStatus === "Active"
            ? "🎉 Congratulations! Your account is now active, and you're all set to continue contributing to the platform."
            : "⚠️ Your account has been deactivated. If you believe this to be an error, please review and contact us."
        }
      </p>

      <p>For any questions, clarifications, or assistance, feel free to reach out to our admin, <strong>${adminName}</strong>, at <a href="mailto:${adminEmail}" style="color: #4CAF50;">${adminEmail}</a>.</p>

      <p>Best Regards,</p>
      <p style="text-align: center; font-weight: bold;">${adminName} - Admin, ${organizationName}</p>
    </div>
  `;
}
