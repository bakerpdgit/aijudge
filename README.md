# AI Fact Consistency Checker

A simple one-page React application that uses OpenAI's API to judge whether two facts are consistent or not.

## Features

- Clean, modern single-page interface
- Input two facts and check their consistency using AI
- Real-time feedback from OpenAI GPT models
- Secure API key input (stored only in browser session)
- Responsive design with a pleasant dark theme

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

## Installation

1. Clone the repository:
```bash
git clone https://github.com/bakerpdgit/aijudge.git
cd aijudge
```

2. Install dependencies:
```bash
npm install
```

## Usage

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to `http://localhost:5173`

3. Enter your OpenAI API key in the provided field (it's stored only in your browser session)

4. Enter two facts you want to compare

5. Click "Check Consistency" or press Ctrl+Enter to get the AI's judgment

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

To preview the production build:

```bash
npm run preview
```

## Security Note

⚠️ **IMPORTANT SECURITY WARNING** ⚠️

This application uses the OpenAI API directly from the browser. Your API key is:
- Never sent to any server except OpenAI
- Stored only in your browser's memory during the session
- Not saved to localStorage or any persistent storage

**However**, using API keys directly in the browser is NOT recommended for production applications because:
- The API key can be extracted from browser network traffic
- Users could abuse your API key and incur costs
- There's no rate limiting or usage control

**For production use**, you should:
1. Implement a backend API server (Node.js, Python, etc.)
2. Store the API key securely on the server (environment variables)
3. Have your React app call your backend API
4. Implement authentication, rate limiting, and usage monitoring on your backend

This implementation is suitable for:
- Personal use
- Educational purposes
- Demonstrations
- Prototyping

## How it Works

The app uses OpenAI's GPT-3.5-turbo model to:
1. Analyze both facts
2. Determine if they contradict each other
3. Classify them as CONSISTENT, INCONSISTENT, or UNCERTAIN
4. Provide a brief explanation of the reasoning

## Technologies Used

- React 19
- Vite
- OpenAI API
- Modern CSS with custom styling

## License

See [LICENSE](LICENSE) file for details.

