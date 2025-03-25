const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;

if (!serviceAccount) {
  console.error("FIREBASE_SERVICE_ACCOUNT is not defined or is empty.");
  process.exit(1); // Stop the application to prevent further errors
}

try {
  const parsedServiceAccount = JSON.parse(serviceAccount);
  console.log("Service Account JSON parsed successfully!");
} catch (error) {
  console.error("Error parsing service account JSON:", error.message);
  process.exit(1);
}
