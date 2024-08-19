const pattern = new RegExp(
  "/^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*.?[a-zA-Z0-9])*.[a-zA-Z](-?[a-zA-Z0-9])+$/"
);

/**
 * Validate an email address.
 * @param email - The email address to validate.
 * @returns
 */
export function validateEmail(email: string): boolean {
  if (!email) {
    return false;
  }

  const emailParts = email.split("@");

  if (emailParts.length !== 2) {
    return false;
  }

  const account = emailParts[0];
  const address = emailParts[1];

  if (account.length > 64 || address.length > 255) {
    return false;
  }

  const domainParts = address.split(".");

  if (domainParts.some((part) => part.length > 63)) {
    return false;
  }

  return pattern.test(email);
}
