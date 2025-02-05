export const CourseStatusEmail = (courseName, courseStatus, instructorName, adminName) => {
  // Determine color based on course status
  const statusColor = courseStatus === "Approved" ? "#4CAF50" : "#FF0000"; // Green for Approved, Red for Draft

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: ${statusColor}; text-align: center;">📢 Course Status Updated</h2>

      <p>Dear ${instructorName},</p>

      <p>The status of your course <strong>${courseName}</strong> has been updated by your Admin <strong>${adminName}</strong> on Skill Share.</p>

      <h3 style="text-align: center; color: ${statusColor}; font-size: 20px; background: #f4f4f4; padding: 10px; border-radius: 5px;">
        Status: ${courseStatus}
      </h3>

      <p>
        ${
          courseStatus === "Approved"
            ? "🎉 Congratulations! Your course has been approved and is now live."
            : "⚠️ Your course is currently in draft mode. Please review and make necessary updates."
        }
      </p>

      <p>For any questions, feel free to reach out.</p>

      <p>Best Regards,</p>
      <p style="text-align: center; font-weight: bold;">${adminName} - Skill Share Admin</p>
    </div>
  `;
};
