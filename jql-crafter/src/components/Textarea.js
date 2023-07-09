import { useState } from 'react'


export default function Textarea({ setText }) {

    const [prompt, setPrompt] = useState()
    const { Configuration, OpenAIApi } = require("openai");

    function generateJQL(prompt) {
        console.log(process.env)
        const configuration = new Configuration({
            apiKey: process.env.REACT_APP_OPENAI_API_KEY
        });

        console.log("conf: ", process.env.OPENAI_API_KEY)
        const openai = new OpenAIApi(configuration);

        var output = ""
        openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Generate a JQL query for jira to " + prompt + ". Remember to add double quotes to string values.",
            temperature: 0,
            max_tokens: 150,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            stop: ["#", ";"],
        }).then((response) => {
            output = response.data.choices[0].text;
            output = output.trim() //remove new lines and spaces before and after text
            setText(output)
        }).catch((error) => {
            console.error(error);
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        generateJQL(prompt);
    }

    return (
        <div className='w-full'>
            <form onSubmit={handleSubmit} className="relative px-20">

                <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">

                    <textarea
                        rows={2}
                        name="description"
                        id="description"
                        className="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Example: Find all issues with the status 'Open' in project 'ABC'"
                        defaultValue={''}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />

                    {/* Spacer element to match the height of the toolbar */}
                    <div aria-hidden="true">
                        <div className="py-2">
                            <div className="h-9" />
                        </div>
                        <div className="h-px" />
                        <div className="py-2">
                            <div className="py-px">
                                <div className="h-9" />
                            </div>
                        </div>
                    </div>
                </div>


                <div className="absolute inset-x-px bottom-0 px-20">
                    {/* Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. */}
                    <div className="flex items-center justify-end space-x-3 px-2 py-2 sm:px-3">
                        <div className="flex">
                            <button
                                type="submit"
                                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    )
}