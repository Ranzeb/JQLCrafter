/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CalendarIcon, PaperClipIcon, TagIcon, UserCircleIcon } from '@heroicons/react/20/solid'



const assignees = [
    { name: 'Unassigned', value: null },
    {
        name: 'Wade Cooper',
        value: 'wade-cooper',
        avatar:
            'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    // More items...
]
const labels = [
    { name: 'Unlabelled', value: null },
    { name: 'Engineering', value: 'engineering' },
    // More items...
]
const dueDates = [
    { name: 'No due date', value: null },
    { name: 'Today', value: 'today' },
    // More items...
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Textarea({ insertable }) {

    const [prompt, setPrompt] = useState()
    const [result, setResult] = useState()
    const { Configuration, OpenAIApi } = require("openai");

    useEffect(() => {
        console.log("result: ", result);
    }, result);

    function generateJQL(prompt) {
        const configuration = new Configuration({
            apiKey: "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",
        });

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
            // Handle the response here

            console.log(response.data.choices[0].text);
            output = response.data.choices[0].text;
        })
            .catch((error) => {
                // Handle any errors that occurred during the API call
                console.error(error);
            });

        return output;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const response = generateJQL(prompt);
        setResult(response)
        console.log("setCompletion: ", result);
    }

    useEffect(() => {

    }, result);

    return (
        <div className='w-full'>
            <form onSubmit={handleSubmit} className="relative py-20 px-20">

                <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                    <label htmlFor="description" className="sr-only">
                        Description
                    </label>
                    {insertable &&
                        <textarea
                            rows={2}
                            name="description"
                            id="description"
                            className="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Write a description..."
                            defaultValue={''}
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />
                    }
                    {!insertable &&
                        <textarea
                            rows={2}
                            name="description"
                            id="description"
                            className="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Write a description..."
                            value={result}
                            disabled
                        />
                    }
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

                {insertable &&
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
                }
            </form>
        </div>
    )
}