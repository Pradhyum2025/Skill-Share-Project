export const enrollmentEmailTemplate = (courseName, organizationName, paymentId, amount) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #4CAF50; text-align: center;">🎉 Congratulations on Your Enrollment! 🎉</h2>

      <p>Dear Student,</p>

      <p>We are thrilled to inform you that you have successfully enrolled in the <strong>${courseName}</strong> course at <strong>${organizationName}</strong>. Your learning journey starts now!</p>

      <h3 style="color: #333;">📌 Payment Details:</h3>
      <ul style="list-style: none; padding: 0;">
        <li><strong>Course:</strong> ${courseName}</li>
        <li><strong>Organization:</strong> ${organizationName}</li>
        <li><strong>Payment ID:</strong> ${paymentId}</li>
        <li><strong>Amount Paid:</strong> ₹${amount}</li>
      </ul>

      <p>If you have any questions, feel free to contact us.</p>

      <p>Happy Learning! 🚀</p>

      <p style="text-align: center; font-weight: bold;">${organizationName} Team</p>
    </div>
  `;
};


