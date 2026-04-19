import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
    ListResourcesRequestSchema,
    ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { createPage, createComponent } from "./libs/gardener-services.js";
import fsp from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = new Server(
    {
        name: "gardener-mcp",
        version: "1.0.0",
    },
    {
        capabilities: {
            tools: {},
            resources: {},
        },
    }
);

/**
 * Resources
 */
server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return {
        resources: [
            {
                uri: "gardener://docs/json-schema",
                name: "Gardener JSON UI Schema",
                mimeType: "text/markdown",
                description: "Documentation for the gardener() JSON UI definition format",
            },
        ],
    };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    if (request.params.uri === "gardener://docs/json-schema") {
        const docs = `
# Gardener JSON UI Schema

The \`gardener()\` function renders the DOM from a JSON configuration object.

## Schema Properties:
- \`t\`: (string) HTML tag name (e.g., 'div', 'p', 'svg').
- \`cn\`: (string[]) Array of CSS class names.
- \`txt\`: (string) Text content of the element.
- \`attr\`: (object) Key-value pairs of attributes (e.g., { id: 'header', type: 'text' }).
- \`events\`: (object) Event listeners (mapping event names to handler functions).
- \`children\`: (array) Recursive array of Gardener DOM configuration objects.

## Example:
\`\`\`json
{
  "t": "div",
  "cn": ["p-4", "bg-blue-500"],
  "children": [
    { "t": "h1", "txt": "Hello Gardener" }
  ]
}
\`\`\`
    `;
        return {
            contents: [
                {
                    uri: request.params.uri,
                    mimeType: "text/markdown",
                    text: docs,
                },
            ],
        };
    }
    throw new Error("Resource not found");
});

/**
 * Tools
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "create_route",
                description: "Create a new route and associated page in the Gardener application. IMPORTANT: The route acts as the path (e.g., '/contact' or '/blog/post'). Filenames are automatically generated (e.g., 'contact.ejs', 'pages.contact.js'). Routes should NOT be renamed manually after creation.",
                inputSchema: {
                    type: "object",
                    properties: {
                        route: {
                            type: "string",
                            description: "The path of the route (e.g., '/contact', '/about/team'). Slashes will be used for route registration and filenames.",
                        },
                    },
                    required: ["route"],
                },
            },
            {
                name: "create_component",
                description: "Create a new reusable Gardener UI component.",
                inputSchema: {
                    type: "object",
                    properties: {
                        path: {
                            type: "string",
                            description: "The file path relative to src/frontend (e.g., 'static/components/myButton.js').",
                        },
                        content: {
                            type: "string",
                            description: "The JavaScript content of the component (ES Module).",
                        },
                    },
                    required: ["path", "content"],
                },
            },
        ],
    };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
        if (name === "create_route") {
            const { route } = args as { route: string };
            await createPage(route);
            return {
                content: [{ type: "text", text: `Successfully created route: ${route}` }],
            };
        }

        if (name === "create_page") {
            // Fallback for backward compatibility if needed, but let's just use create_route
            const { pageName } = args as { pageName: string };
            await createPage(pageName);
            return {
                content: [{ type: "text", text: `Successfully created route: ${pageName}` }],
            };
        }

        if (name === "create_component") {
            const { path: filePath, content } = args as { path: string; content: string };
            await createComponent(filePath, content);
            return {
                content: [{ type: "text", text: `Successfully created component at: ${filePath}` }],
            };
        }

        throw new Error(`Unknown tool: ${name}`);
    } catch (error) {
        return {
            content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
            isError: true,
        };
    }
});

async function run() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Gardener MCP server running on stdio");
}

run().catch((error) => {
    console.error("Fatal error running MCP server:", error);
    process.exit(1);
});
