import BunqJSClient from "@bunq-community/bunq-js-client";
const { Password, Select } = require("enquirer");

export default async (bunqJSClient: BunqJSClient, API_KEY: string = "") => {
    const prompt = new Select({
        message: "No API key is set, would you like to enter one or have one generated for you?",
        choices: [
            { message: "Generate a new sandbox API key", value: "generate" },
            { message: "Enter a API key manually", value: "custom" }
        ]
    });

    const encryptionKeyType = await prompt.run();
    if (encryptionKeyType === "generate") {
        return bunqJSClient.api.sandboxUser.post();
    } else {
        const inputPrompt = new Password({
            message: "Enter a valid API key",
            validate: value => value && value.length === 64,
            initial: API_KEY ? API_KEY : ""
        });

        return inputPrompt.run();
    }
};
