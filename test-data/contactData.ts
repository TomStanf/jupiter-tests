export interface ContactFormData {
  forename: string;
  email: string;
  message: string;
}

export const validContact: ContactFormData = {
  forename: 'Jane',
  email: 'jane.tester@example.com',
  message: 'Hello Jupiter Toys, this is an automated test message.',
};

export const expectedErrors = {
  forename: 'Forename is required',
  email: 'Email is required',
  message: 'Message is required',
} as const;
