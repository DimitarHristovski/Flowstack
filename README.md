# 📘 Flowstack Documentation

## 🧠 What is Flowstack?

**Flowstack** is a modular, low-code AI workflow framework that enables users to design, run, and scale **agent-based task flows** with integrated tools like memory, search, code execution, and external APIs. It's designed for developers, makers, and power users who want to build complex AI workflows without rebuilding the infrastructure.

---

## 🚀 Key Features

- 🔗 **Tool-Enabled Agents**: Use tools like web search, Python code, and memory inside your agents.
- ⚙️ **Modular Workflow System**: Compose agents in flows with logic branches and tool chaining.
- 💬 **Prompt Engineering UI**: Create, test, and debug prompts visually.
- 🌐 **Web Interface + API Access**: Run agents from a dashboard or via API.
- 📦 **Extensible Plugin Architecture**: Easily add new tools and agent types.

---

## 📁 Project Structure

```
Flowstack/
├── agents/         # Custom agent definitions
├── flows/          # Task flows composed of agents and tools
├── tools/          # Utility modules (web search, code, etc.)
├── server/         # Backend API and flow execution logic
├── ui/             # Frontend (Next.js or similar)
├── config/         # Environment and agent configs
└── README.md
```

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/DimitarHristovski/Flowstack.git
cd Flowstack
```

### 2. Install Dependencies

If the project uses Node:

```bash
npm install
```

If it has a Python backend:

```bash
pip install -r requirements.txt
```

### 3. Start the App

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in the terminal).

**Note:** This app uses local storage for data persistence. No backend or database setup is required.

---

## 💡 Creating a Flow

1. Open the web UI (likely at `localhost:3000`).
2. Click **"Create Flow"**.
3. Add agents and tools in sequence or with logic branches.
4. Test and debug each step interactively.
5. Save and deploy flow.

---

## 📬 API Access

You can trigger flows via REST API:

```http
POST /api/execute
Content-Type: application/json

{
  "flowId": "summary-pipeline",
  "input": "Summarize the latest AI news"
}
```

---

## 🧱 Contributing

Want to build a tool or agent?

1. Create a file in `/tools` or `/agents`.
2. Register it in the configuration.
3. Restart the server.

---

## 📄 License

MIT License  
© [Dimitar Hristovski](https://github.com/DimitarHristovski)
