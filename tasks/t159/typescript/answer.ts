import { Blob as NodeBlob } from "buffer";

function chatLogsToMarkdownBlob(chat: string[], title: string = "ChatGPT Conversation"): Blob {
    let markdown = `# ${title}\n\n`;

    chat.forEach((message, index) => {
        const speaker = index % 2 === 0 ? "Human" : "Assistant";
        markdown += `**${speaker}:**\n${message}\n\n***\n\n`;
    });

    const now = new Date();
    const date = now.toISOString().split("T")[0];
    const time = now.toTimeString().split(" ")[0];
    markdown += `Exported on ${date} ${time}.`;

    return new NodeBlob([markdown], { type: "text/markdown" }) as unknown as Blob;
}
