import { Mistral } from "@mistralai/mistralai";
import readline from "node:readline"
import dotenv from "dotenv"
import { read_shell_history, tools, getInfoFromFileInWd, getInfoFromSpecificFile } from "./tools.js";
import hljs from "highlight.js";
import chalk from "chalk";
dotenv.config()

const apiKey = "POjCwfVcJKDVERloIQnrmxndl1GeMjqb"
console.log('Type "exit", ctrl+c or ctrl+d to exit');
console.log('How can I Help?')

const mistralClient = new Mistral({apiKey: apiKey})

// Function to create an interface to read and write data.
let userInput

const messages = [
    {
        role: 'system',
        content: `
            When asked about the content of any file with the root directory '/' as its ancestor (e.g., '/etc/filename', '/proc/dirname/filename', '/var/log/filename', '/home/user/file', etc.), first read the file on the machine using the available tools.
            If asked about the content a file whose whose path is not commonly known or you do not know the path to, first look for it in the current working directory and read it using the appropriate tool.
            If file is not found in the current working directory, Then tell the user that the the file not being in the current working directory is why the file could not be found.   
            Then ask the user to provide a path to the file.
        `
    } 
]
// the previous content for system role in messages array:
// When asked about the content of specific files like '/etc/resolv.conf or /proc/meminfo ' or a question that requires to read files of a specific file, first check the files on the machine using the available tools.
//  because you could not find it in the current working directory and it does not have a commonly known path on all Linux based computers, so that you can find it and be able to provide information about it.
let result = ''
let stopResponse = false // flag to stop the response from the agent when the user types enter while the agent is writing the response on the terminal.
let availableFunctions = {
    read_shell_history,
    getInfoFromFileInWd,
    getInfoFromSpecificFile
}
const rw = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
// Interface to interact with the user.
async function interactWithUser() {

    
        const prompt = await new Promise((resolve) => {
            rw.question( "\nAsk AI: \n", (answer) => {
                if(answer !== '') {
                    resolve(answer)
                    console.log()
                } else {
                    console.log("Please enter a prompt")
                    interactWithUser()
                }
            })
        })

    if(prompt.toLowerCase() === "exit"){
        console.log("Good bye😊!")
        rw.close()
        return
    }

    userInput = prompt
    messages.push()
    // Ensure the debounce function finishes before continuing
    // await generateResponse()
    await debounceOutput()

    // interactWithUser()
}
interactWithUser()

// Function to handle the enter key press when the agent is writting the response on the terminal.
function handleEnterKeyPress(str, key) {
    if(key.name === 'return') {
        stopResponse = true
        interactWithUser()
    }
}

// Function to add Enter key event listener.
function addEnterKeyPressListener() {
    readline.emitKeypressEvents(process.stdin)
    process.stdin.on("keypress", handleEnterKeyPress)
}

// Function to color the code block
function colorCodeBlock(code, language) {
    try{
        const highlightedCode = hljs.highlight(code, {language}).value
        // Remove HTML tags and replace with ANSI colors using chalk
        const ansiCode = highlightedCode
            .replace(/<span class="hljs-string">(.*?)<\/span>/g, chalk.green("$1"))
            .replace(/<span class="hljs-keyword">(.*?)<\/span>/g, chalk.blue("$1"))
            .replace(/<span class="hljs-title function_">(.*?)<\/span>/g, chalk.yellow("$1"))
            .replace(/<span class="hljs-variable language_">(.*?)<\/span>/g, chalk.cyan("$1"));

        return ansiCode;
    } catch(err) {
        console.log(err)
    }
}

// Function to remove the Enter key event listener.
function removeEnterKeyPressListener() {
    process.stdin.removeListener("keypress", handleEnterKeyPress)
}

async function agent(query) {
    addEnterKeyPressListener();
    stopResponse = false;
    let chunksBuffer = [];
    let inCodeBlock = false;
    let lang = "plaintext"; // Default to plaintext if language is unknown
    let codeBuffer = "";

    messages.push({ role: "user", content: query });

    for (let i = 0; i < 5; i++) {
        const response = await mistralClient.chat.stream({
            model: "mistral-large-latest",
            messages: messages,
            tools: tools,
            stream: true,
        });

        try {
            for await (const chunk of response) {
                if (stopResponse) return;
                const content = chunk.data.choices[0].delta.content;
                chunksBuffer.push(content);
                let line = chunksBuffer.join("");

                if (content === "\n") {
                    let matchBeginCodeBlock = line.match(/^```(\w+)/);
                    let matchEndCodeBlock = line.match(/^```\n/);

                    if (matchBeginCodeBlock) {
                        inCodeBlock = true;
                        lang = matchBeginCodeBlock[1] || "plaintext";
                        codeBuffer = ""; // Reset code buffer
                    } else if (matchEndCodeBlock) {
                        inCodeBlock = false;
                        console.log(colorCodeBlock(codeBuffer, lang));
                        codeBuffer = ""; // Clear buffer after printing
                    }
                }

                if (inCodeBlock) {
                    codeBuffer += content; // Accumulate code
                } else {
                    process.stdout.write(content);
                }

                if (chunk.data.choices[0].finishReason === "stop") {
                    messages.push({ role: "assistant", content: result });
                    console.log();
                    removeEnterKeyPressListener();
                    interactWithUser();
                    return;
                }
            }
        } catch (err) {
            console.error("Error during response handling:", err);
        }
    }
}


// Function to call the agent while adding some other code to be run whe the agent is called
async function generateResponse() {
    await agent(userInput)
}

// debounce function to handle the rate limit of the mistral api call
function debounce(func, delay) {
    let timeoutId
    return async function(...args) {
        const context = this
        if(timeoutId) clearTimeout(timeoutId)
        timeoutId = setTimeout(() => func.apply(context, args),delay)
        if(args[0]) args[0]()
    }
}

const debounceOutput = debounce(generateResponse, 1000)

