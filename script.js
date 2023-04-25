const API_URL = "http://127.0.0.1:5000/api/chat";


const chatOutput = document.getElementById("chatOutput");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});

sendBtn.addEventListener("click", () => {
    sendMessage();
});

async function sendMessage() {
    const message = userInput.value.trim();
    if (message.length > 0) {
        displayMessage("user", message);
        userInput.value = "";

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message: message })
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Chatbot response:", data);
                displayMessage("bot", data.response);
            } else {
                console.error("Chatbot API error:", response);
                displayMessage("bot", "Sorry, I am currently unable to process your request.");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            displayMessage("bot", "Sorry, I am currently unable to process your request.");
        }
    }
}


function displayMessage(sender, message) {
    const p = document.createElement("p");
    p.classList.add(sender === "user" ? "user" : "bot");
    p.textContent = message;
    chatOutput.appendChild(p);
    chatOutput.scrollTop = chatOutput.scrollHeight;
}
