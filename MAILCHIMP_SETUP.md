# Mailchimp Setup Guide

This project includes a newsletter signup form that integrates with Mailchimp. Follow these steps to configure the integration:

## 1. Get Your Mailchimp API Key

1. Log in to your Mailchimp account
2. Go to **Account** → **Extras** → **API Keys**
3. Click **Create A Key**
4. Copy the generated API key

## 2. Find Your List/Audience ID

1. Go to **Audience** → **All contacts**
2. Click **Settings** → **Audience name and defaults**
3. Copy the **Audience ID** (it will look like: `1234567890`)

## 3. Find Your Server Prefix

1. Look at your API key URL in the API Keys section
2. The server prefix is the part after `https://` and before `.api.mailchimp.com`
3. Examples: `us1`, `us2`, `us3`, etc.

## 4. Set Up Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
MAILCHIMP_API_KEY=your_mailchimp_api_key_here
MAILCHIMP_LIST_ID=your_list_id_here
MAILCHIMP_SERVER_PREFIX=us1
```

## 5. Configure Merge Fields (Optional)

The form automatically maps:

- `firstName` → `FNAME` merge field
- `lastName` → `LNAME` merge field

Make sure these merge fields exist in your Mailchimp audience. If you need different field names, update the API route in `src/app/api/subscribe/route.ts`.

## 6. Test the Integration

1. Start your development server: `npm run dev`
2. Fill out the form and submit
3. Check your Mailchimp audience to see if the contact was added

## Troubleshooting

- **"Server configuration error"**: Check that all environment variables are set correctly
- **"This email is already subscribed"**: The email is already in your Mailchimp audience
- **"Failed to subscribe"**: Check your API key and list ID are correct

## Security Notes

- Never commit your `.env.local` file to version control
- The API key has access to your Mailchimp account, keep it secure
- Consider using environment variables in production deployments
